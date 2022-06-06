var expect = require('chai').expect;
var getCsapatMW = require('../../../../middleware/Csapat/getCsapatMW');

describe('getCsapatMW middleware ', function () {

    it('should set res.locals.csapat with a csapat object from the database', function (done) {
        const mw = getCsapatMW({
            CsapatModel: {
                findOne: (p1,cb) =>{
                    expect(p1).to.be.eql({ _id : '1'});
                    cb(null,'mockCsapat');
                }
            }
        });
        const resMock={
            locals: {}
        };
        mw(
            {
                params: {
                    csapatId : '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined)
                expect(resMock.locals).to.be.eql({csapat: 'mockCsapat'});
                done();
            }
        );

    });
    it('should call next with error when there is a database problem', function (done) {
        const mw = getCsapatMW({
            CsapatModel: {
                findOne: (p1,cb) =>{
                    expect(p1).to.be.eql({ _id : '1'});
                    cb('database error',null);
                }
            }
        });
        const resMock={
            locals: {}
        };
        mw(
            {
                params: {
                    csapatId : '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql('database error');
                expect(resMock.locals).to.be.eql({});
                done();
            }
        );


    });
    it('should call next when couldnt find the csapat in the database', function (done) {
        const mw = getCsapatMW({
            CsapatModel: {
                findOne: (p1,cb) =>{
                    expect(p1).to.be.eql({ _id : '1'});
                    cb(undefined,null);
                }
            }
        });
        const resMock={
            locals: {}
        };
        mw(
            {
                params: {
                    csapatId : '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined)
                expect(resMock.locals).to.be.eql({});
                done();
            }
        );

    });
})