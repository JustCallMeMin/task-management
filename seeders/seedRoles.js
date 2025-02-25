const db = require("../src/models");

(async () => {
    await db.Role.bulkCreate([
        { roleId: 1, roleName: "Admin" },
        { roleId: 2, roleName: "Manager" },
        { roleId: 3, roleName: "User" }
    ]);

    console.log("✅ Seed dữ liệu Role thành công!");
    process.exit();
})();
