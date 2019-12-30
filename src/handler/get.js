module.exports = {
  getUserFromRequest: async function (req) {
  const userId = req.body.text.split('|')[0].slice(2);
  return await getUser(userId);
  },

  getUserFromString: async function (userId) {
    return await getUser(userId);
  }
}

async function getUser(userId) {
  try {
    var stmt;

    if (userId) {
      stmt = 'SELECT initial_total AS it from initial_totals WHERE user_id = ?';
      const initial_total = await pool.query(stmt, [userId]);

      stmt = 'SELECT initiator_user_id AS iuid, recipient_user_id AS ruid, transaction_amt AS amt from transactions WHERE initiator_user_id = ? OR recipient_user_id = ?';
      const transactions = await pool.query(stmt, [userId, userId]);

      const total = transactions.reduce((acc, t) => userId === t.iuid ? acc - t.amt : acc + t.amt, initial_total[0].it)
      return `<@${userId}> - ${total} HC`;
    } else {
      stmt = 'SELECT user_id AS id, initial_total AS it from initial_totals';
      const users = await pool.query(stmt);

      let counts = await Promise.all(users.map(getUserHCString));
      return counts.join('\n');
    }
  } catch (err) {
    console.log(err);
    return 'Ya goofed son';
  }
}

async function getUserHCString(user) {
  stmt = 'SELECT initiator_user_id AS iuid, recipient_user_id AS ruid, transaction_amt AS amt from transactions WHERE initiator_user_id = ? OR recipient_user_id = ?';
  const transactions = await pool.query(stmt, [user.id, user.id]);

  const total = transactions.reduce((acc, t) => user.id === t.iuid ? acc - t.amt : acc + t.amt, user.it)

  return `<@${user.id}> - ${total} HC`;
}
