const str1 = "nrInst,nrAgencia,cdClient,nmClient,nrCpfCnpj,nrContrato,dtContrato,qtPrestacoes,vlTotal,cdProduto,dsProduto,cdCarteira,dsCarteira,nrProposta,nrPresta,tpPresta,nrSeqPre,dtVctPre,vlPresta,vlMora,vlMulta,vlOutAcr,vlIof,vlDescon,vlAtual,idSituac,idSitVen,nrCpfCnpjValid";
const str2 = "533,31,56133,CLIENTE 1,41854274761,733067,20221227,5,83720.19,777,CDC PESSOA JURIDICA,17,CRÉDITO DIRETO AO CONSUMIDOR,798586,2,Original,0,20220406,17524.03,29196.96,536.4,0,0,0,47257.39,Aberta,Vencida,0";

const wordCount1 = str1.split(',').length;
const wordCount2 = str2.split(',').length;

console.log(`Number of words: ${wordCount1}`);
console.log(`Number of words: ${wordCount2}`);