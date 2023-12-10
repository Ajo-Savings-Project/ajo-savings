// sample endpoint maping
/**
 * @swagger
 * /sample/getbooks:
 *   get:
 *     summary: Get all books.
 *     description: This endpoint returns all the books in the database
 *     tags:
 *      - Samples
 *     responses:
 *       200:
 *         description: Successful retrieval of all books data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
