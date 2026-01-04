import { describe, it, expect } from 'vitest';
// Tuodaan molemmat funktiot testattavaksi
import { poistaTehtava, muokkaaTehtava } from './public/app.js';

describe('Logiikka: Tehtävien hallinta', () => {
  describe('muokkaaTehtava (Edit)', () => {
    it('Päivittää tehtävän priorityn ja nimen oikein', () => {
      const alkuperaiset = [
        {
          id: '1',
          topic: 'Vanha nimi',
          priority: 'low',
          status: 'todo',
        },
      ];

      const muutokset = {
        topic: 'Uusi hieno nimi',
        priority: 'high', // Vaihdetaan low -> high
        status: 'todo',
      };

      const tulos = muokkaaTehtava(alkuperaiset, '1', muutokset);

      expect(tulos[0].topic).toBe('Uusi hieno nimi');
      expect(tulos[0].priority).toBe('high');
      expect(tulos[0].id).toBe('1'); // ID:n pitää säilyä
    });

    it('Ei muuta muita listan tehtäviä', () => {
      const alkuperaiset = [
        { id: '1', topic: 'Pysyy samana' },
        { id: '2', topic: 'Muokataan tätä' },
      ];

      const tulos = muokkaaTehtava(alkuperaiset, '2', { topic: 'Muutettu' });

      expect(tulos[0].topic).toBe('Pysyy samana'); // Ensimmäisen ei pitäisi muuttua
      expect(tulos[1].topic).toBe('Muutettu');
    });
  });

  describe('poistaTehtava (Delete)', () => {
    it('Poistaa tehtävän listasta', () => {
      const lista = [{ id: '1' }, { id: '2' }];
      const tulos = poistaTehtava(lista, '1');
      expect(tulos.length).toBe(1);
      expect(tulos[0].id).toBe('2');
    });
  });
});
