import tmdbApi from "../tmdb/tmdb-api.js";

export const personDetail = async (params) => {
  try {
    const { personId } = params;
    console.log("PARAMS : ", params);
    const person = await tmdbApi.personDetail({ personId });
    return {
      success: true,
      message: "successfully fetched person details",
      data: person,
    };
  } catch {
    console.log("person-service: personDetail :: ERROR ", error.message);
    return {
      success: false,
      message: "Failed to fetch person  details",
      errorCode: 500,
    };
  }
};

export const personMedias = async (params) => {
  try {
    const { personId } = params;
    const medias = await tmdbApi.personMedias({ personId }); 
    return {
      success: true,
      message: "successfully fetched person medias",
      data: medias,
    };
  } catch {
    console.log("person-service: personMedias :: ERROR ", error);
    return {
      success: false,
      message: "Failed to fetch person medias",
      errorCode: 500,
    };
  }
};


export default { personDetail, personMedias };