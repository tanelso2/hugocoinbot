const get = require('./get').asdfasdf;

module.exports = init = async (req) => {
  const userId = req.body.user_id;
  if (req.body.text.split(' ').length < 2 || req.body.text.split(' ').length > 2) {
    return 'Please format this request correctly. Check hc_help documentation.';
  }

  const recipientId = req.body.text.split(' ')[0];
  const amt = parseInt(req.body.text.split(' ')[1]);
  const comment = req.body.text.split(' ')[2] || '';

  try {
    var stmt = 'SELECT * from initial_totals WHERE user_id = ?';
    const user_exists = await pool.query(stmt, [recipientId]);
    if (!user_exists) {
      return 'User doesn\'t exist. Please initialize dat boi. See /hc_init for help.';
    }

    const currentBal = await getUserFromString(userId);
    if (parseInt(currentBal.split(' ')[1]) < amt) {
      return `You only got ${currentBal.split(' ')[1]} hugocoins. Can't do that.`;
    }

    var stmt = 'INSERT INTO transactions(initiator_user_id, recipient_user_id, transaction_amt, transaction_comment) VALUES (?, ?, ?, ?)';
    await pool.query(stmt, [userId, recipientId, amt, comment]);
  } catch (err) {
    console.log(err);
    return 'Ya goofed son';
  }
};
