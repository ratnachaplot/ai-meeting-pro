const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  analyzeMeeting,
  getAllMeetings,
  getMeetingById,
  toggleActionItem,
  deleteMeeting
} = require('../controllers/meetingController');

router.post('/',                             protect, analyzeMeeting);   // POST   /api/meetings
router.get('/',                               protect, getAllMeetings);    // GET    /api/meetings
router.get('/:id',                            protect, getMeetingById);   // GET    /api/meetings/:id
router.patch('/:meetingId/toggle/:itemIndex', protect, toggleActionItem); // PATCH  /api/meetings/:id/toggle/:index
router.delete('/:id',                         protect, deleteMeeting);    // DELETE /api/meetings/:id

module.exports = router;