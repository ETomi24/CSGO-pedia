var expect = require('chai').expect;
var getJatekosMW = require('../../../../middleware/Jatekos/getJatekosMW');

describe('getJatekosMW middleware ', function () {

    it('should set res.locals.jatekos with a jatekos object from the database', function (done) {
        const mw = getJatekosMW({
            JatekosModel: {
                findOne: (p1,cb) =>{
                    expect(p1).to.be.eql({ _id : '1'});
                    cb(null,'mockJatekos');
                }
            }
        });
        const resMock={
            locals: {}
        };
        mw(
            {
                params: {
                    jatekosId : '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined)
                expect(resMock.locals).to.be.eql({jatekos: 'mockJatekos'});
                done();
            }
        );

    });
    it('should call next with error when there is a database problem', function (done) {
        const mw = getJatekosMW({
            JatekosModel: {
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
                    jatekosId : '1'
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
    it('should call next when couldnt find the jatekos in the database', function (done) {
        const mw = getJatekosMW({
            JatekosModel: {
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
                    jatekosId : '1'
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