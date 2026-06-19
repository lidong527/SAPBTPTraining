import cds from '@sap/cds'
// const cds = require('@sap/cds')

module.exports = class AdminService extends cds.ApplicationService {
  init() {

    const { Books } = this.entities

    /**
     * Generate IDs for new Books drafts
     */
    this.before('NEW', Books!.drafts!, async (req) => {
      if (req.data.ID) return
      const { ID: id1 } = await SELECT.one.from(Books!).columns('max(ID) as ID')
      const { ID: id2 } = await SELECT.one.from(Books!.drafts!).columns('max(ID) as ID')
      req.data.ID = Math.max(id1 || 0, id2 || 0) + 1
    })

    this.before('READ', Books!, req => {
      console.log('User:', req.user.id)
      console.log('Roles:', Object.keys(req.user.roles as Record<string, unknown>)) //[...req.user.roles])
    })

    return super.init()
  }

}
