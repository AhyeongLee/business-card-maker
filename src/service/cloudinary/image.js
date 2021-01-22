const url = `https://api.cloudinary.com/v1_1/ahyeong/image/upload`;

/**
 * For CDN service (Cloudinary) to manage image file
 */
class Image {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * @param {FormData} data - FormData of image file
     * @returns {public_id} - unique key of uploaded image
     */
    uploadImageToCloudinary = async (data) => {
        const result = await fetch(url, {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => data.public_id);
        return result;
    }
}

export default Image;