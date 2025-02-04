import apiClient from "@/lib/api-client";

export const courseClient = {
  getCourseList: async (accessToken: string) => {
    const response = await apiClient.get("/api/course/list", {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }
    return response.data;
  },

  getCourseDetail: async (accessToken: string, courseId: string) => {
    const response = await apiClient.get(`/api/course/detail?id=${courseId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }
    return response.data;
  },

  getPurchasedCourses: async (accessToken: string) => {
    const response = await apiClient.get('/api/course/purchased', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    
    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }
    return response.data;
  }
};

