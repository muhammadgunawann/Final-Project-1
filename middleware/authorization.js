const db = require("../config/db");

const authorization = async (req, res, next) => {
    const userData = res.locals.user;
    let id = req.params.id || 0;

    try {
        let dbResult = await db.query(`SELECT * FROM reflections WHERE id = $1`, [id]);
        
        if(dbResult.rows.length === 0) {
            return res.status(404).json({
                message: `reflections with id (${id} is not found`
            })
        }else {
            if (dbResult.rows[0].owner_id != userData.id) {
                return res.status(403).json({
                    message: "you don't have permisson to acess this reflections"
                })
            }else {
                return next()
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "error"
        })
    }
}

module.exports = authorization;