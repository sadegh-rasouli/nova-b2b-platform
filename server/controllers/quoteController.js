import QuoteRequest from '../models/QuoteRequest.js';
import Product from '../models/Product.js';

// @desc    Submit a new Request for Quotation (RFQ)
// @route   POST /api/quotes
// @access  Public
export const submitQuoteRequest = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      corporateEmail,
      phone,
      country,
      productId,
      productName,
      productCode,
      quantity,
      unit,
      packaging,
      targetDeliveryDate,
      incoterms,
      message,
    } = req.body;

    // Validation
    if (!fullName || !companyName || !corporateEmail || !phone || !country || !productName || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Name, Company, Email, Phone, Country, Material, and Quantity).',
      });
    }

    const quote = await QuoteRequest.create({
      fullName,
      companyName,
      corporateEmail: corporateEmail.toLowerCase(),
      phone,
      country,
      productId: productId || null,
      productName,
      productCode: productCode || '',
      quantity: Number(quantity),
      unit: unit || 'Metric Tons',
      packaging: packaging || '25kg Multi-layer Bags',
      targetDeliveryDate: targetDeliveryDate || null,
      incoterms: incoterms || 'FOB (Free On Board)',
      message: message || '',
    });

    res.status(201).json({
      success: true,
      message: 'Quotation request submitted successfully.',
      quoteNumber: quote.quoteNumber,
      data: quote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get quote details by ID or Quote Number (Verification)
// @route   GET /api/quotes/:idOrNumber
// @access  Public / Authorized
export const getQuoteById = async (req, res) => {
  try {
    const { idOrNumber } = req.params;
    const query = idOrNumber.startsWith('RFQ-')
      ? { quoteNumber: idOrNumber }
      : { _id: idOrNumber };

    const quote = await QuoteRequest.findOne(query).populate('productId', 'name code category');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quotation request not found.',
      });
    }

    res.json({
      success: true,
      data: quote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
