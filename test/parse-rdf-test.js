'use strict';
const fs = require('fs')
const {expect} = require('chai')
const rdf = fs.readFileSync(`${__dirname}/../../data/cache/epub/132/pg132.rdf`)
const {parseRDF} = require('../lib/parse-rdf')

describe('parseRDF', () => {
  it('should be a function', () => {
    expect(parseRDF).to.be.a('function')
  })

  it('should parse RDF content', () => {
    const book = parseRDF(rdf)
    expect(book).to.be.an('object')
    expect(book.id).to.equal(132)
    expect(book.title).to.equal('The Art of War')
    expect(book)
      .to.have.a.property('authors').that
        .is.an('array').with.length(2)
        .and.contains('Sunzi, active 6th century B.C.')
        .and.contains('Giles, Lionel')

    expect(book).to.have.a.property('subjects').that
      .is.an('array').with.lengthOf(2)
      .and.contains('Military art and science -- Early works to 1800')
      .and.contains('War -- Early works to 1800')
  })
})