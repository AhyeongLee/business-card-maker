const url = `https://api.cloudinary.com/v1_1/ahyeong/image/upload`;
class Image {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        console.log('Image constructor');
        console.log(apiKey);
    }
    uploadImageToCloudinary = async (data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => data.public_id);
        // console.log(res);
        return res;
    }
}

export default Image;