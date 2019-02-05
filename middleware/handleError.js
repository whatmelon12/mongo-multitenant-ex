module.exports = (req, res, error) => {
    return res.status(500).send(error);
}