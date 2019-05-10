import db from '../../services/MySQLHandler';

const imageQuery = {
  selectWithName: (data, callback) =>
    db.query(`SELECT * FROM photos WHERE name = ?`, data, callback),

  updateUsedTime: (data, callback?) =>
    db.query(`UPDATE photos SET date_used = UTC_TIMESTAMP WHERE id = ?`, data),

  insertNewPhoto: (data, callback) =>
    db.query(`INSERT INTO photos SET ?`, data, callback),

  deleteWithId: (data, callback) =>
    db.query(`DELETE FROM photos WHERE id = ?`, data, callback)
};

export default imageQuery;
