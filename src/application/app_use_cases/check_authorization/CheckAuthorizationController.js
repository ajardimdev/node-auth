module.exports = (req, res) => {
  return res.status(200).json({ authorized: true });
};
