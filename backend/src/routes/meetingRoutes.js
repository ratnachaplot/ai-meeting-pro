const express = require('express');
const router = express.Router();
const {
  analyzeMeeting,
  getAllMeetings,
  getMeetingById,
  toggleActionItem,
  deleteMeeting
} = require('../controllers/meetingController');

router.post('/',                              analyzeMeeting);   // POST   /api/meetings
router.get('/',                               getAllMeetings);    // GET    /api/meetings
router.get('/:id',                            getMeetingById);   // GET    /api/meetings/:id
router.patch('/:meetingId/toggle/:itemIndex', toggleActionItem); // PATCH  /api/meetings/:id/toggle/:index
router.delete('/:id',                         deleteMeeting);    // DELETE /api/meetings/:id

module.exports = router;