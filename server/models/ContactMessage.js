import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    subject: {
      type: String,
      required: [true, 'Please specify subject'],
      trim: true,
    },
    inquiryType: {
      type: String,
      enum: [
        'General Inquiry',
        'Technical Support & TDS',
        'Sample Request',
        'Supply Chain & Logistics',
        'Compliance & Certification',
        'Partnership & Distribution',
      ],
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Please provide your message details'],
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'archived'],
      default: 'new',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
