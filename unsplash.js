const axios = require('axios');

async function populateImages(destinations, unsplashApiKey) {
    const updatedDestinations = [];

    for (const destination of destinations) {
        if (!destination.image || destination.image === '') {
            const query = `${destination.name} urban`;
            const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashApiKey}&orientation=squarish`;

            try {
                const response = await axios.get(apiUrl);

                if (response.data) {
                    const imageUrl = response.data.urls.regular;
                    const updatedDestination = { ...destination, image: imageUrl };
                    updatedDestinations.push(updatedDestination);

                    console.log(`Image updated for ${destination.name}: ${imageUrl}`);
                } else {
                    console.log(`No image found for ${destination.name}`);
                }
            } catch (error) {
                console.error(`Error updating image for ${destination.name}: ${error.message}`);
            }
        } else {
            updatedDestinations.push(destination);
        }
    }
    return updatedDestinations;
}

module.exports = populateImages;
