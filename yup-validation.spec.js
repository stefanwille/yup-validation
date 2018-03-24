const yup = require('yup');

describe('yup', () => {
  describe('isValidSync()', () => {
    it('returns whether the given object is valid', async () => {
      const schema = yup.number();
      expect(schema.isValidSync(30)).toBe(true);
      expect(schema.isValidSync('NO')).toBe(false);
    });
  });

  describe('isValid()', async () => {
    it('returns a Promise indicating if the given object is valid', async () => {
      const schema = yup.number();
      expect(await schema.isValid(30)).toBe(true);
      expect(await schema.isValid('NO')).toBe(false);
    });
  });

  describe('validateSync()', () => {
    it('returns the cast object on success', () => {
      const schema = yup.number();
      expect(schema.validateSync('30')).toBe(30);
    });

    it('throws on validation failure', () => {
      const schema = yup.number();
      try {
        expect(schema.validateSync('boom')).toBe(30);
        fail();
      } catch (error) {
        expect(error.message).toMatch(/must be a `number` type/);
        expect(error.errors).toEqual([
          'this must be a `number` type, but the final value was: `NaN` (cast from the value `"boom"`).'
        ]);
      }
    });
  });

  describe('validate()', () => {
    it('returns a Promise with the converted object on success', async () => {
      const schema = yup.number();
      expect(await schema.validate('30')).toBe(30);
    });

    it('throws on validation failure', async () => {
      const schema = yup.number();
      try {
        await schema.validate('NO');
        fail();
      } catch (error) {
        expect(error.message).toMatch(/must be a `number` type/);
      }
    });
  });

  describe('schema types', () => {
    describe('default', () => {
      it('validates as optional', () => {
        const schema = yup.number();
        expect(schema.isValidSync(undefined)).toBe(true);
      });
    });

    describe('require()', () => {
      it('validates required', () => {
        const schema = yup.number().required();
        expect(schema.isValidSync(undefined)).toBe(false);
      });
    });

    describe('object()', () => {
      it('validates object schemas', () => {
        const objectSchema = yup.object({
          name: yup.string().required(),
          age: yup.number().required()
        });

        expect(
          objectSchema.isValidSync({
            name: 'jimmy',
            age: 27
          })
        ).toBe(true);
        expect(
          objectSchema.isValidSync({
            name: 'jimmy',
            age: 'not-a-number'
          })
        ).toBe(false);
      });
    });

    describe('array()', () => {
      it('validates arrays', () => {
        const schema = yup.array().of(yup.number());
        expect(schema.isValidSync([1, 2, 3])).toBe(true);
        expect(schema.isValidSync([])).toBe(true);
        expect(schema.isValidSync(['NO'])).toBe(false);
      });
    });

    describe('boolean()', () => {
      it('validates booleans', () => {
        const schema = yup.boolean();
        expect(schema.isValidSync(true)).toBe(true);
        expect(schema.isValidSync('false')).toBe(true);
        expect(schema.isValidSync('FALSE')).toBe(true);
        expect(schema.isValidSync('boom')).toBe(false);
      });
    });

    describe('mixed()', () => {
      it('validates "any" type', () => {
        const schema = yup.mixed();
        expect(schema.isValidSync(3)).toBe(true);
        expect(schema.isValidSync('YES')).toBe(true);
      });
    });

    describe('test()', () => {
      it('adds a function to the schema validation', () => {
        const schema = yup.string().test({
          name: 'is-stefan',
          message: '${path} is not Stefan',
          test: function(value) {
            return value === 'stefan';
          }
        });
        expect(schema.isValidSync('stefan')).toBe(true);
        expect(schema.isValidSync('something')).toBe(false);
      });
    });
  });
});
