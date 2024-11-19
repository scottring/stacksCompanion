# Setting Up the Bubble.io Trigger

Follow these steps to configure your Bubble.io application to trigger form creation when a product status changes to "Approved":

## 1. Create a Workflow

1. In your Bubble.io editor, go to the "Workflows" tab
2. Create a new workflow with the trigger: "When a Product's Status field is changed"
3. Add a condition: "When Status equals 'Approved'"

## 2. Add API Call Action

Add a "Make an API call" action to your workflow with these settings:

1. **API Configuration**:
   - Method: POST
   - URL: [Your deployed app URL]/api/create-form
   - Headers:
     ```
     Content-Type: application/json
     ```

2. **Request Body**:
   ```json
   {
     "productName": ":current product's Name field:",
     "productId": ":current product's _id:",
     "recipients": ":current product's Recipients field:",
     "status": "Approved"
   }
   ```

   Note: Replace the `:placeholders:` with the actual field names from your Bubble.io database.

## 3. Set Up Product Data Structure

Ensure your Bubble.io product data type has these fields:
- Name (text)
- Status (text/option)
- Recipients (list of text - for email addresses)

## 4. Environment Setup

1. Deploy your Next.js application to get your production URL
2. Update your .env file with:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_sender_email
   NEXT_PUBLIC_URL=your_deployed_app_url
   ```

## Testing the Integration

1. Create a test product in Bubble.io
2. Add some test email addresses to the Recipients field
3. Change the status to "Approved"
4. Check that:
   - The API call is made successfully (check Bubble.io logs)
   - Test recipients receive emails
   - The form link in the emails works
   - Submissions are stored correctly

## Troubleshooting

If the integration isn't working:

1. Check Bubble.io workflow logs for API call details
2. Verify the API endpoint URL is correct
3. Ensure all required fields are being sent in the correct format
4. Check your application logs for any errors
5. Verify SendGrid is configured correctly and emails are being sent

## Security Considerations

1. Consider adding authentication to your API endpoint
2. Validate email addresses before sending
3. Rate limit the API endpoint to prevent abuse
4. Consider adding CORS restrictions to only allow requests from your Bubble.io domain
