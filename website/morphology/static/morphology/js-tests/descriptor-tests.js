/**
 * Copyright (C) Quranic Arabic Corpus, 2014.
 * Rafid K. Abdullah, rafidka@gmail.com (Developer of this file)
 * Kais Dukes, sckd@leeds.ac.uk (Original developer of Quranic Arabic Corpus)
 *
 * This file is part of the Quranic Arabic Corpus.
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This software is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * the Quranic Arabic Corpus. If not, see <http://www.gnu.org/licenses/>.
 */

test('Generate b/bi/ Description', function() {
  'use strict';
  var bi = new Morphology.Segment({
    'token_no': 1,
    'tag': 'P',
    'chapter_no': 1,
    'form': 'bi',
    'segment_id': 1001001001,
    'segment_no': 1,
    'verse_no': 1,
    'features': 'PREFIX|bi+'
  });

  var descriptor = new Morphology.Descriptor();
  var biDesc = descriptor.generateSegmentDescription(bi);
  equal(biDesc, 'prefixed preposition');
});

test('Generate b/somi/ Description', function() {
  'use strict';
  var somi = new Morphology.Segment({
    'token_no': 1,
    'tag': 'N',
    'chapter_no': 1,
    'form': 'somi',
    'segment_id': 1001001002,
    'segment_no': 2,
    'verse_no': 1,
    'features': 'STEM|POS:N|LEM:{som|ROOT:smw|M|GEN'
  });
  var descriptor = new Morphology.Descriptor();
  var somiDesc = descriptor.generateSegmentDescription(somi);
  equal(somiDesc, 'genitive masculine noun');
});
