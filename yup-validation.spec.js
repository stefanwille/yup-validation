describe('yup', () => {
  describe('isValid', () => {
    it('validates required values', async () => {
      const contactSchema = object({
        name: string().required(),
        age: number()
          .required()
          .positive()
          .integer()
      });
      const contact = {
        name: 'jimmy',
        age: 27
      };

      await contactSchema.isValid(contact);
    });
  });
});
