module.exports = init = async (req) => {
  const userId = req.body.user_id;
  const count = parseInt(req.body.text);
  try {
    const stmt = 'INSERT INTO initial_totals (user_id, initial_total) VALUES (?, ?)';
    await pool.query(stmt, [userId, count]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return 'You\'ve already initialized your count you clod. You absolute buffoon.'
      +'\nIf you absolutely need your initial value changed, please tell Ross.';
    }
    console.log(err);
  }
  return `Initial value of ${count} coins set.`;
};
