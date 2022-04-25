exports.notFound = (req, res) => {
  return res.status(404).send(`<h1> 404 :( Sorry...Route ${req.url} not found ! </h1>`);
};
