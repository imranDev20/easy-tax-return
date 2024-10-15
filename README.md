# Easy Tax Return

This project is a comprehensive tax return form application built with React and TypeScript. It provides a digital solution for filling out and managing individual tax returns for Bangladeshi citizens, with features like dynamic form fields, PDF generation, and complex calculations.

## Features

- Dynamic form fields with various input types (text, number, date, radio, select, etc.)
- Real-time calculations and validations
- PDF generation of the filled form
- Signature capture functionality
- Responsive design for different screen sizes
- Integration with external services (e.g., EdgeStore for file uploads)

## Tech Stack

- React
- TypeScript
- Next.js
- Zod (for schema validation)
- jsPDF and html2canvas (for PDF generation)
- react-hook-form (for form management)
- Tailwind CSS (for styling)
- Prisma (for database management)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tax-return-form-app.git
   cd tax-return-form-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables (e.g., database connection string, EdgeStore API keys).

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js app directory containing page components
- `components/`: Reusable React components
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and constants
- `types/`: TypeScript type definitions
- `prisma/`: Prisma schema and migrations

## Key Components

- `use-tax-return-form.ts`: Main hook for managing the tax return form state and calculations
- `use-form-fields.ts`: Hook for defining and managing form fields
- `use-calculations.ts`: Hook containing all calculation logic for the tax return
- `generatePDF.ts`: Function for generating a PDF of the filled form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hook-form](https://react-hook-form.com/)
- [jsPDF](https://github.com/MrRio/jsPDF)
- [html2canvas](https://html2canvas.hertzen.com/)
