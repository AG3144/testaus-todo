import { describe, it, expect } from 'vitest';
import { poistaTehtava } from './public/app.js';

describe('Logiikka: Taskin poisto', () => {
  it('Poistaa oikean tehtävän listasta ID:n perusteella', () => {
    // 1. Luodaan testimielessä lista, jossa on kaksi tehtävää
    const alkuperainenLista = [
      { id: '1', topic: 'Pese pyykit' },
      { id: '2', topic: 'Käy kaupassa' },
    ];

    // 2. Kutsutaan funktiota: poistetaan ID '1'
    const uusiLista = poistaTehtava(alkuperainenLista, '1');

    // 3. Tarkistetaan tulos
    expect(uusiLista.length).toBe(1); // Listan pituus pitäisi pudota 2 -> 1
    expect(uusiLista[0].id).toBe('2'); // Jäljellä pitäisi olla vain task '2'
  });

  it('Ei tee mitään jos poistettavaa ID:tä ei löydy', () => {
    const lista = [{ id: '1', topic: 'Ainoa tehtävä' }];

    // Yritetään poistaa ID '999', jota ei ole
    const uusiLista = poistaTehtava(lista, '999');

    // Listan pitäisi pysyä samana
    expect(uusiLista.length).toBe(1);
    expect(uusiLista[0].id).toBe('1');
  });
});
