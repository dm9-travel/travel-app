module.exports = {
  Get_Flights: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const {} = req.body;

    dbInstance
      .Get_Flights()
      .then(flights => {
        res.status(200).send(flights);
      })
      .catch(err => err);
  },
  Get_Watchlist: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .Get_Watchlist(params.id)
      .then(list => {
        res.status(200).send(list);
      })
      .catch(err => err);
  }
};
