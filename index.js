const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.handler = async event => {
  if (event.httpMethod === 'GET') {
    const converted_url =
      event.pathParameters && event.pathParameters.converted_url

    if (!converted_url) {
      return {
        statusCode: 200,
        headers: {
          'content-type': 'text/html',
        },
        body:
          'W3Z is deprecated, the urls shortened in the past will work forever.',
      }
    }

    try {
      const link = await prisma.links.findOne({
        where: {
          converted_url,
        },
      })
      return {
        statusCode: 302,
        headers: {
          Location: link.url,
        },
      }
    } catch (e) {
      console.log(e)
      return {
        statusCode: 404,
        headers: {
          'content-type': 'text/html',
        },
        body: 'What are you looking for ? 404!',
      }
    }
  } else {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html',
      },
      body:
        'W3Z is deprecated, the urls shortened in the past will work forever.',
    }
  }
}
