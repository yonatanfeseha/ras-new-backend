import { db } from "../config/db.js";

export const getStats = async () => {
  // total members
  const [[{ totalMembers }]] = await db.query(
    "SELECT COUNT(*) as totalMembers FROM members",
  );

  // payment stats
  const [[{ paid }]] = await db.query(
    "SELECT COUNT(*) as paid FROM members WHERE payment_status = 1",
  );

  const [[{ unpaid }]] = await db.query(
    "SELECT COUNT(*) as unpaid FROM members WHERE payment_status = 0",
  );

  const [[{ warning }]] = await db.query(
    "SELECT COUNT(*) as warning FROM members WHERE payment_status = 2",
  );

  return {
    totalMembers,
    paid,
    unpaid,
    warning,
  };
};
