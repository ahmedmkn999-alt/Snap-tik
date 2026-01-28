export default async function handler(request, response) {
    // استقبال رابط الفيديو من الواجهة الأمامية
    const { url } = request.query;

    if (!url) {
        return response.status(400).json({ error: 'من فضلك ضع رابط الفيديو' });
    }

    // إعدادات الاتصال بـ RapidAPI
    const options = {
        method: 'GET',
        headers: {
            // المفتاح هنا بييجي من إعدادات فيرسل المخفية
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'tiktok-download-video1.p.rapidapi.com'
        }
    };

    try {
        // ملحوظة: تأكد من اسم الـ Endpoint من صفحة الـ API
        // غالباً بيكون /video أو /analysis حسب الـ API اللي اخترته
        // هنا استخدمنا افتراضياً تمرير الرابط كـ query parameter
        const apiUrl = `https://tiktok-download-video1.p.rapidapi.com/video?url=${encodeURIComponent(url)}`;
        
        const apiResponse = await fetch(apiUrl, options);
        
        if (!apiResponse.ok) {
             throw new Error('فشل الاتصال بـ API');
        }

        const data = await apiResponse.json();

        // إرسال البيانات (الفيديو) للموقع
        response.status(200).json(data);

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'حدث خطأ أثناء جلب الفيديو' });
    }
}
