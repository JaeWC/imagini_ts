import db from '../services/MySQLHandler';

const statController = {
  getStats: (req, res) => {
    db.query(
      `SELECT COUNT(*) total, SUM(size) size, MAX(date_used) last_used FROM photos`,
      (err, rows) => {
        if (err) {
          return res.status(500).end();
        }

        rows[0].uptime = process.uptime();

        return res.send(rows[0]);
      }
    );
  }
};

export default statController;
