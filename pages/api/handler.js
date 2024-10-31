// This function can run for a maximum of 30 seconds
export const config = {
    maxDuration: 30,
  };
   
  export default function handler(request, response) {
    response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
  }