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

/**
 * This file contains the JavaScript implementation of the Descriptor class, a
 * class which generates morphological description of the segments of the
 * Holy Quran.
 *
 * This is a re-implementation of the original Java code written by Kais Dukes.
 * By re-implementation it is meant that the code tries, at least at the time
 * of writing this note, to achieve the same end functionality of the Java
 * code, but the implementation is not necessarily identical. Since the goal of
 * the re-implementation is to eventually support more features, it is highly
 * expected that the implementation might start to deviate in many areas from
 * the original Java code.
 *
 * @author rafidka@gmail.com (Rafid K. Abdullah)
 */

var Morphology = Morphology || {};

// TODO: Use RequireJS or another dependency management system.
if (Morphology.Segment === undefined) {
  throw 'The Descriptor class depends on the Segment class.';
}


/**
 * Generates description of the segments of the Holy Quran.
 */
Morphology.Descriptor = (function() {
  'use strict';

  var Descriptor = function() {
  };


  /**
   * Generates a morphological description for the given prefix-type segment.
   * @param {Morphology.Segment} segment The prefix-type segment to retrieve the
   * description for.
   * @return {String} The morphological description of the segment.
   * @private
   */
  function _generatePrefixDescription(segment) {
    var desc = 'prefixed ' + segment.getName();

    if (segment.partOfSpeech.value === Morphology.PartOfSpeeh.Preposition) {
      switch (segment.lemma) {
        case 'l':
          desc += ' {lAm}';
          break;

        case 'b':
          desc += ' {bi}';
          break;
      }
    } else if (segment.partOfSpeech.value ===
        Morphology.PartOfSpeeh.Conjunction) {
      switch (segment.lemma) {
        case 'w':
          desc += ' {wa} (and)';
          break;
      }
    }
    /** TODO: Implement the rest of the conditions from the Java code, file
     * DescriptorWriter.java, line 163.
     */
    /*else {
     }*/

    return desc;
  }

  /**
   * Appends the case of the stem to the given description array.
   * @param {Morphology.Segment} segment
   * @param {string[]} descArray An array containing the words making up the
   * description of the stem.
   * @private
   */
  function _appendStemCase(segment, descArray) {
    if (segment.case !== null) {
      descArray.push(segment.case.toString().toLowerCase());
    }
  }

  /**
   * Appends the person, gender, and number of the stem to the given description
   * array.
   * @param {Morphology.Segment} segment The segment.
   * @param {string[]} descArray An array containing the words making up the
   * description of the stem.
   * @private
   */
  function _appendStemPhiFeatures(segment, descArray) {
    // TODO: Improve defineEnum to support attaching  description to enum.
    // This allows us to make this mode much conciser.
    if (segment.person !== null) {
      switch (segment.person.value) {
        case Morphology.Person.First:
          descArray.push('1st person');
          break;
        case Morphology.Person.Second:
          descArray.push('2nd person');
          break;
        case Morphology.Person.Third:
          descArray.push('3rd person');
          break;
        default:
          throw 'Invalid person.';
      }
    }

    if (segment.gender !== null) {
      switch (segment.gender.value) {
        case Morphology.Gender.Masculine:
          descArray.push('masculine');
          break;
        case Morphology.Gender.Feminine:
          descArray.push('feminine');
          break;
        default:
          throw 'Invalid gender.';
      }
    }

    if (segment.number !== null) {
      descArray.push(segment.number.toString().toLowerCase());
    }
  }

  /**
   * Appends the noun state of the stem to the given description array.
   * @param {Morphology.Segment} segment
   * @param {string[]} descArray An array containing the words making up the
   * description of the stem.
   * @private
   */
  function _appendNounState(segment, descArray) {
    if (segment.nounState !== null) {
      descArray.push(segment.nounState.toString().toLowerCase());
    }
  }

  /**
   * Appends the verb form to the given description array.
   * @param {Morphology.Segment} segment
   * @param {string[]} descArray An array containing the words making up the
   * description of the stem.
   * @private
   */
  function _appendVoiceType(segment, descArray) {
    if (segment.voiceType !== null) {
      descArray.push(segment.voiceType.toString().toLowerCase());
    }
  }

  /**
   * Appends the verb form to the given description array.
   * @param {Morphology.Segment} segment
   * @param {string[]} descArray An array containing the words making up the
   * description of the stem.
   * @private
   */
  function _appendStemForm(segment, descArray) {
    if (segment.verbForm !== null) {
      descArray.push('(form ' + segment.verbForm.value + ')');
    }
  }

  /**
   * Appends the verb aspect to the given description array.
   * @param {Morphology.Segment} segment
   * @param {string[]} descArray An array containing the words making up the
   * description of the stem.
   * @private
   */
  function _appendStemAspect(segment, descArray) {
    if (segment.verbAspect !== null) {
      descArray.push(segment.verbAspect.toString().toLowerCase());
    }
  }

  /**
   * Generates a morphological description for the given stem-type segment.
   * @param {Morphology.Segment} segment The stem-type segment to retrieve the
   * description for.
   * @return {String} The morphological description of the segment.
   * @private
   */
  function _generateStemDescription(segment) {
    var descArray = [];
    _appendStemCase(segment, descArray);
    _appendStemPhiFeatures(segment, descArray);
    _appendNounState(segment, descArray);
    _appendStemForm(segment, descArray);
    _appendVoiceType(segment, descArray);
    _appendStemAspect(segment, descArray);
    descArray.push(segment.getName());
    return descArray.join(' ');
  }

  /**
   * Generates a morphological description for the
   * @param {Morphology.Segment} segment The suffix-type segment to retrieve the
   * description for.
   * @return {string} The morphological description of the segment.
   * @private
   */
  function _generateSuffixDescription(segment) {
    var descArray = [];
    var pronounType = segment.findPronounType();
    // If the suffix is a subject pronoun, we don't need to add the phi
    // features because they follow those of the verb.
    if (pronounType === null ||
        pronounType.value !== Morphology.PronounType.Subject) {
      _appendStemPhiFeatures(segment, descArray);
    }
    descArray.push(segment.getName());
    return descArray.join(' ');
  }

  /**
   * Generates a morphological description for the given segment.
   * @param {Morphology.Segment} segment
   * @return {String} The morphological description of the segment.
   */
  Descriptor.prototype.generateSegmentDescription = function(segment) {
    switch (segment.type.value) {
      case Morphology.SegmentType.Prefix:
        return _generatePrefixDescription(segment);
      case Morphology.SegmentType.Stem:
        return _generateStemDescription(segment);
      case Morphology.SegmentType.Suffix:
        return _generateSuffixDescription(segment);
    }
    throw 'Invalid segment type.';
  };

  return Descriptor;
}());

