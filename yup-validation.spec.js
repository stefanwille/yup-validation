const { object, number, string } = require('yup');

describe('yup', () => {
  describe('isValid()', () => {
    it('returns true if the given object is valid', async () => {
      const schema = number();
      expect(await schema.isValid(30)).toBe(true);
      expect(await schema.isValid('NO')).toBe(false);
    });

    it('validates required', async () => {
      const optionalSchema = number();
      expect(await optionalSchema.isValid(30)).toBe(true);
      expect(await optionalSchema.isValid(undefined)).toBe(true);
      const requiredSchema = number().required();
      expect(await requiredSchema.isValid(30)).toBe(true);
      expect(await requiredSchema.isValid(undefined)).toBe(false);
    });

    it('validates object schemas', async () => {
      const objectSchema = object({
        name: string().required(),
        age: number()
          .required()
          .positive()
          .integer()
      });

      expect(await objectSchema.isValid({ name: 'jimmy', age: 27 })).toBe(true);
      expect(
        await objectSchema.isValid({ name: 'jimmy', age: 'not-a-number' })
      ).toBe(false);
    });

    describe('validate()', () => {
      it('returns the converted object on success', async () => {
        const schema = number();
        expect(await schema.validate(30)).toBe(30);
        expect(await schema.validate('30')).toBe(30);
      });

      it('throws an error if invalid', async () => {
        const schema = number();
        try {
          await schema.validate('NO');
          fail();
        } catch (error) {
          expect(error.message).toMatch(/must be a `number` type/);
        }
      });
    });
  });
});
