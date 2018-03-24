const { object, number, string } = require('yup');

describe('yup', () => {
  describe('isValidSync()', () => {
    it('returns whether if the given object is valid', async () => {
      const schema = number();
      expect(schema.isValidSync(30)).toBe(true);
      expect(schema.isValidSync('NO')).toBe(false);
    });

    it('validates optional values', () => {
      const schema = number();
      expect(schema.isValidSync(undefined)).toBe(true);
    });

    it('validates required', () => {
      const schema = number().required();
      expect(schema.isValidSync(undefined)).toBe(false);
    });

    it('validates object schemas', () => {
      const objectSchema = object({
        name: string().required(),
        age: number().required()
      });

      expect(objectSchema.isValidSync({ name: 'jimmy', age: 27 })).toBe(true);
      expect(
        objectSchema.isValidSync({ name: 'jimmy', age: 'not-a-number' })
      ).toBe(false);
    });
  });

  describe('isValid()', async () => {
    it('returns a Promise indicating if the given object is valid', async () => {
      const schema = number();
      expect(await schema.isValid(30)).toBe(true);
      expect(await schema.isValid('NO')).toBe(false);
    });

    describe('validate()', () => {
      it('returns a Promise with the converted object on success', async () => {
        const schema = number();
        expect(await schema.validate(30)).toBe(30);
        expect(await schema.validate('30')).toBe(30);
      });

      it('throws on validation failure', async () => {
        const schema = number();
        try {
          await schema.validate('NO');
          fail();
        } catch (error) {
          expect(error.message).toMatch(/must be a `number` type/);
        }
      });
    });

    describe('validateSync()', () => {
      it('returns the converted object on success', () => {
        const schema = number();
        expect(schema.validateSync(30)).toBe(30);
      });

      it('throws on validation failure', () => {
        const schema = number();
        try {
          expect(schema.validateSync('boom')).toBe(30);
          fail();
        } catch (error) {
          expect(error.message).toMatch(/must be a `number` type/);
        }
      });
    });
  });
});
