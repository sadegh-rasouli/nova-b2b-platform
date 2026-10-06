import ContactMessage from '../models/ContactMessage.js';

// @desc    Submit a general contact or technical inquiry
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, company, phone, subject, inquiryType, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete required fields (Name, Email, Subject, and Message).',
      });
    }

    const contact = await ContactMessage.create({
      name,
      email: email.toLowerCase(),
      company: company || '',
      phone: phone || '',
      subject,
      inquiryType: inquiryType || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. A technical representative will respond within 24 business hours.',
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
