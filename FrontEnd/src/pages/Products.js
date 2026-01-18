import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('matematica');
  const [reviews, setReviews] = useState({}); // Estado para las reseñas cargadas (por producto)
  const [reviewText, setReviewText] = useState(''); // Estado para el texto de la reseña
  const [cartItems, setCartItems] = useState([]); // Estado para el carrito

  const products = {
    matematica: [
      {
        name: 'El universo de las matematicas',
        description: 'Un recorrido alfabetico por los grandes teoremas',
        price: '$10',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%201.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015706Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=78d3f8c4beaed88bd031d98a27bd1f84d7bbe110d4befc041963ae971d6f036d',
        productId: '123',
      },
      {
        name: 'Matematica introductoria',
        description: 'Por Manuel Murillo',
        price: '$18',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%202.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015749Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=50c6aad5b506289c683c295d233fc32cf76bb696554937c50c30e2f32fe3d360',
        productId: '124',
      },
      {
        name: 'El libro de las matematicas',
        description: 'Libro con ejercicios didacticos',
        price: '$30',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%203.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015810Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=4dcb5e00e45be047686c68f81a55635259e8ae63a92fd0d74a08e76bd0f22a78',
        productId: '125',
      },
      {
        name: 'Matematica superior',
        description: 'Calculo diferencial integral',
        price: '$15',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%204.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015830Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=6ec79cb7bd6cd8b2dcf8bfc1c2fe8f64ddd1634d833c247cc962d476fec00534',
        productId: '126',
      },
    ],
    fisica: [
      {
        name: 'Historia fisica universo',
        description: 'Por Eduardo Battaner',
        price: '$5',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20fisica/fisica%201.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJHMEUCICEX6%2Bs%2FFZ3U6tp%2FNKwbUC8ikm4rX%2BQNI%2BIoXr8w2Uf5AiEAyQOlKZJnueiY1PvUn%2Bxo1gDGn8wUSmNTsh4O9pBU7X8q2wMIExAEGgw3OTIzODQxMjA1MzMiDJCsprKGh4u%2BZl63eCq4A3IbNBsMuM5E3siITC2NUuzBKGFS6efrDcn%2B5G4i4O%2B8Asb6dobITa%2BXRSkGtjqRjtjSWWYN3FrBgYHmy%2F7pvloh3FLG2w6yBkpPz%2FpxhJuwEk9%2BoQXJS%2FQksHw2r0xd%2BiVPmFYCTXprqDFfkE56wRhXJ9KK41vsXLnttoPSiMxU45mMekULrrpg9fpAIdupO1EiXNk8H3zE3nCtXy%2BFVxX%2BkcB52zNWxMi7DY28vItVEB5WFk5VRpTJcOy76QgyuygnVJsRvNMkWG90zp5Z2Q8TjVdw7o9CUiT6vyC9S0h1pw5QLHA8mw1x1WR6eOKoXC1PtnoqgICUwqmAPD185ffaZIiuNt84V4AXTLWneMwJCO2vhJX1l8HbV19tU4D0HnhI49G24DftTtfOhZxmSWlwuRYOeOBVysFaqyzKsi34mkascXBW8SOsUVDOBjlErh%2FdtVwEcxX1SR2tdExsemLI3nIvHkZTZXLJSyTZcgtgiBrAo5YSSmSBPJd%2FCcLoI%2FV%2FCStPbClHIWK%2BJcS%2BfXRWz0xmQFo%2Fh%2BWMMC%2BWWqcQ3GQa4FT55qpklT8tzxc%2BezRVPEPxvcMuMPW3m8sGOrcCj3r4lHdht4TtoH23qejHz3LqzjFWPoDBZEr6lb%2BBQTvwN9QQsBNo9L0COeP%2FSavGT%2F672ogAd40BMxYetwyrE2hEeH25fyFGX%2BaxqLrGYnsbGPcwZ32216QFpwFtErDHGr2x0xlWMkM5G15uYW%2B5n0DR7Pnh11cgewzga4X88vQc1ygb3S7QuxYGJwzf1M1SoMVCKBUTM6Bj4kdJZq4GmF%2FQ%2FCsqPA8Mu7kj18yd59voS6A16aNQMqtjLvLozEnEo2Ed09%2Bv8XCowX9cOdKeHB3%2But1WjCEPLjGzkuapCFxys95aApy1YByD%2FGHf%2Fijdh37kw6F7%2BYgod6g8JUHjh4TL4lXCRjYsYtXqDPFoyKdvPFfn4zJATOCRd8qY2avcGG9xHXCPfW7%2FZp88b5Wv6PPRq1IofJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KT2YDT5NG%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021258Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=296101aa5a680c45a63d4d84c5d9ab85457b98432225f3a7702d06bb875ec755',
        productId: '223',
      },
      {
        name: 'La historia de la fisica',
        description: 'De la filosofia natural al enigma de la materia oscura',
        price: '$8',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20fisica/fisica%202.webp?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJHMEUCICEX6%2Bs%2FFZ3U6tp%2FNKwbUC8ikm4rX%2BQNI%2BIoXr8w2Uf5AiEAyQOlKZJnueiY1PvUn%2Bxo1gDGn8wUSmNTsh4O9pBU7X8q2wMIExAEGgw3OTIzODQxMjA1MzMiDJCsprKGh4u%2BZl63eCq4A3IbNBsMuM5E3siITC2NUuzBKGFS6efrDcn%2B5G4i4O%2B8Asb6dobITa%2BXRSkGtjqRjtjSWWYN3FrBgYHmy%2F7pvloh3FLG2w6yBkpPz%2FpxhJuwEk9%2BoQXJS%2FQksHw2r0xd%2BiVPmFYCTXprqDFfkE56wRhXJ9KK41vsXLnttoPSiMxU45mMekULrrpg9fpAIdupO1EiXNk8H3zE3nCtXy%2BFVxX%2BkcB52zNWxMi7DY28vItVEB5WFk5VRpTJcOy76QgyuygnVJsRvNMkWG90zp5Z2Q8TjVdw7o9CUiT6vyC9S0h1pw5QLHA8mw1x1WR6eOKoXC1PtnoqgICUwqmAPD185ffaZIiuNt84V4AXTLWneMwJCO2vhJX1l8HbV19tU4D0HnhI49G24DftTtfOhZxmSWlwuRYOeOBVysFaqyzKsi34mkascXBW8SOsUVDOBjlErh%2FdtVwEcxX1SR2tdExsemLI3nIvHkZTZXLJSyTZcgtgiBrAo5YSSmSBPJd%2FCcLoI%2FV%2FCStPbClHIWK%2BJcS%2BfXRWz0xmQFo%2Fh%2BWMMC%2BWWqcQ3GQa4FT55qpklT8tzxc%2BezRVPEPxvcMuMPW3m8sGOrcCj3r4lHdht4TtoH23qejHz3LqzjFWPoDBZEr6lb%2BBQTvwN9QQsBNo9L0COeP%2FSavGT%2F672ogAd40BMxYetwyrE2hEeH25fyFGX%2BaxqLrGYnsbGPcwZ32216QFpwFtErDHGr2x0xlWMkM5G15uYW%2B5n0DR7Pnh11cgewzga4X88vQc1ygb3S7QuxYGJwzf1M1SoMVCKBUTM6Bj4kdJZq4GmF%2FQ%2FCsqPA8Mu7kj18yd59voS6A16aNQMqtjLvLozEnEo2Ed09%2Bv8XCowX9cOdKeHB3%2But1WjCEPLjGzkuapCFxys95aApy1YByD%2FGHf%2Fijdh37kw6F7%2BYgod6g8JUHjh4TL4lXCRjYsYtXqDPFoyKdvPFfn4zJATOCRd8qY2avcGG9xHXCPfW7%2FZp88b5Wv6PPRq1IofJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KT2YDT5NG%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021346Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=8f89b394940d8faefa71cd861334ba6333a325a1eb135cd7841e11221fa41eba',
        productId: '224',
      },
      {
        name: 'Fisica Cuantica',
        description: 'Desafiando la intuicion',
        price: '$12',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20fisica/fisica%203.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJHMEUCICEX6%2Bs%2FFZ3U6tp%2FNKwbUC8ikm4rX%2BQNI%2BIoXr8w2Uf5AiEAyQOlKZJnueiY1PvUn%2Bxo1gDGn8wUSmNTsh4O9pBU7X8q2wMIExAEGgw3OTIzODQxMjA1MzMiDJCsprKGh4u%2BZl63eCq4A3IbNBsMuM5E3siITC2NUuzBKGFS6efrDcn%2B5G4i4O%2B8Asb6dobITa%2BXRSkGtjqRjtjSWWYN3FrBgYHmy%2F7pvloh3FLG2w6yBkpPz%2FpxhJuwEk9%2BoQXJS%2FQksHw2r0xd%2BiVPmFYCTXprqDFfkE56wRhXJ9KK41vsXLnttoPSiMxU45mMekULrrpg9fpAIdupO1EiXNk8H3zE3nCtXy%2BFVxX%2BkcB52zNWxMi7DY28vItVEB5WFk5VRpTJcOy76QgyuygnVJsRvNMkWG90zp5Z2Q8TjVdw7o9CUiT6vyC9S0h1pw5QLHA8mw1x1WR6eOKoXC1PtnoqgICUwqmAPD185ffaZIiuNt84V4AXTLWneMwJCO2vhJX1l8HbV19tU4D0HnhI49G24DftTtfOhZxmSWlwuRYOeOBVysFaqyzKsi34mkascXBW8SOsUVDOBjlErh%2FdtVwEcxX1SR2tdExsemLI3nIvHkZTZXLJSyTZcgtgiBrAo5YSSmSBPJd%2FCcLoI%2FV%2FCStPbClHIWK%2BJcS%2BfXRWz0xmQFo%2Fh%2BWMMC%2BWWqcQ3GQa4FT55qpklT8tzxc%2BezRVPEPxvcMuMPW3m8sGOrcCj3r4lHdht4TtoH23qejHz3LqzjFWPoDBZEr6lb%2BBQTvwN9QQsBNo9L0COeP%2FSavGT%2F672ogAd40BMxYetwyrE2hEeH25fyFGX%2BaxqLrGYnsbGPcwZ32216QFpwFtErDHGr2x0xlWMkM5G15uYW%2B5n0DR7Pnh11cgewzga4X88vQc1ygb3S7QuxYGJwzf1M1SoMVCKBUTM6Bj4kdJZq4GmF%2FQ%2FCsqPA8Mu7kj18yd59voS6A16aNQMqtjLvLozEnEo2Ed09%2Bv8XCowX9cOdKeHB3%2But1WjCEPLjGzkuapCFxys95aApy1YByD%2FGHf%2Fijdh37kw6F7%2BYgod6g8JUHjh4TL4lXCRjYsYtXqDPFoyKdvPFfn4zJATOCRd8qY2avcGG9xHXCPfW7%2FZp88b5Wv6PPRq1IofJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KT2YDT5NG%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021404Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=b93964ccb3b6bf4b57361897a635cfa579d017e6f08ac48c6743509564ddc6f7',
        productId: '225',
      },
      {
        name: 'Fisica Universitaria',
        description: 'Con fisica moderna',
        price: '$6',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20fisica/fisica%204.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJHMEUCICEX6%2Bs%2FFZ3U6tp%2FNKwbUC8ikm4rX%2BQNI%2BIoXr8w2Uf5AiEAyQOlKZJnueiY1PvUn%2Bxo1gDGn8wUSmNTsh4O9pBU7X8q2wMIExAEGgw3OTIzODQxMjA1MzMiDJCsprKGh4u%2BZl63eCq4A3IbNBsMuM5E3siITC2NUuzBKGFS6efrDcn%2B5G4i4O%2B8Asb6dobITa%2BXRSkGtjqRjtjSWWYN3FrBgYHmy%2F7pvloh3FLG2w6yBkpPz%2FpxhJuwEk9%2BoQXJS%2FQksHw2r0xd%2BiVPmFYCTXprqDFfkE56wRhXJ9KK41vsXLnttoPSiMxU45mMekULrrpg9fpAIdupO1EiXNk8H3zE3nCtXy%2BFVxX%2BkcB52zNWxMi7DY28vItVEB5WFk5VRpTJcOy76QgyuygnVJsRvNMkWG90zp5Z2Q8TjVdw7o9CUiT6vyC9S0h1pw5QLHA8mw1x1WR6eOKoXC1PtnoqgICUwqmAPD185ffaZIiuNt84V4AXTLWneMwJCO2vhJX1l8HbV19tU4D0HnhI49G24DftTtfOhZxmSWlwuRYOeOBVysFaqyzKsi34mkascXBW8SOsUVDOBjlErh%2FdtVwEcxX1SR2tdExsemLI3nIvHkZTZXLJSyTZcgtgiBrAo5YSSmSBPJd%2FCcLoI%2FV%2FCStPbClHIWK%2BJcS%2BfXRWz0xmQFo%2Fh%2BWMMC%2BWWqcQ3GQa4FT55qpklT8tzxc%2BezRVPEPxvcMuMPW3m8sGOrcCj3r4lHdht4TtoH23qejHz3LqzjFWPoDBZEr6lb%2BBQTvwN9QQsBNo9L0COeP%2FSavGT%2F672ogAd40BMxYetwyrE2hEeH25fyFGX%2BaxqLrGYnsbGPcwZ32216QFpwFtErDHGr2x0xlWMkM5G15uYW%2B5n0DR7Pnh11cgewzga4X88vQc1ygb3S7QuxYGJwzf1M1SoMVCKBUTM6Bj4kdJZq4GmF%2FQ%2FCsqPA8Mu7kj18yd59voS6A16aNQMqtjLvLozEnEo2Ed09%2Bv8XCowX9cOdKeHB3%2But1WjCEPLjGzkuapCFxys95aApy1YByD%2FGHf%2Fijdh37kw6F7%2BYgod6g8JUHjh4TL4lXCRjYsYtXqDPFoyKdvPFfn4zJATOCRd8qY2avcGG9xHXCPfW7%2FZp88b5Wv6PPRq1IofJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KT2YDT5NG%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021424Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=37c5d374c1b8903404a74f7786955b6604377ba8a1e886012a1e08dc11fecbeb',
        productId: '226',
      },
    ],
    variado: [
      {
        name: 'Ciencie e ingenieria de materiales',
        description: 'Por Donald R. Askeland',
        price: '$20',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros%20variados/va%201.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJHMEUCICEX6%2Bs%2FFZ3U6tp%2FNKwbUC8ikm4rX%2BQNI%2BIoXr8w2Uf5AiEAyQOlKZJnueiY1PvUn%2Bxo1gDGn8wUSmNTsh4O9pBU7X8q2wMIExAEGgw3OTIzODQxMjA1MzMiDJCsprKGh4u%2BZl63eCq4A3IbNBsMuM5E3siITC2NUuzBKGFS6efrDcn%2B5G4i4O%2B8Asb6dobITa%2BXRSkGtjqRjtjSWWYN3FrBgYHmy%2F7pvloh3FLG2w6yBkpPz%2FpxhJuwEk9%2BoQXJS%2FQksHw2r0xd%2BiVPmFYCTXprqDFfkE56wRhXJ9KK41vsXLnttoPSiMxU45mMekULrrpg9fpAIdupO1EiXNk8H3zE3nCtXy%2BFVxX%2BkcB52zNWxMi7DY28vItVEB5WFk5VRpTJcOy76QgyuygnVJsRvNMkWG90zp5Z2Q8TjVdw7o9CUiT6vyC9S0h1pw5QLHA8mw1x1WR6eOKoXC1PtnoqgICUwqmAPD185ffaZIiuNt84V4AXTLWneMwJCO2vhJX1l8HbV19tU4D0HnhI49G24DftTtfOhZxmSWlwuRYOeOBVysFaqyzKsi34mkascXBW8SOsUVDOBjlErh%2FdtVwEcxX1SR2tdExsemLI3nIvHkZTZXLJSyTZcgtgiBrAo5YSSmSBPJd%2FCcLoI%2FV%2FCStPbClHIWK%2BJcS%2BfXRWz0xmQFo%2Fh%2BWMMC%2BWWqcQ3GQa4FT55qpklT8tzxc%2BezRVPEPxvcMuMPW3m8sGOrcCj3r4lHdht4TtoH23qejHz3LqzjFWPoDBZEr6lb%2BBQTvwN9QQsBNo9L0COeP%2FSavGT%2F672ogAd40BMxYetwyrE2hEeH25fyFGX%2BaxqLrGYnsbGPcwZ32216QFpwFtErDHGr2x0xlWMkM5G15uYW%2B5n0DR7Pnh11cgewzga4X88vQc1ygb3S7QuxYGJwzf1M1SoMVCKBUTM6Bj4kdJZq4GmF%2FQ%2FCsqPA8Mu7kj18yd59voS6A16aNQMqtjLvLozEnEo2Ed09%2Bv8XCowX9cOdKeHB3%2But1WjCEPLjGzkuapCFxys95aApy1YByD%2FGHf%2Fijdh37kw6F7%2BYgod6g8JUHjh4TL4lXCRjYsYtXqDPFoyKdvPFfn4zJATOCRd8qY2avcGG9xHXCPfW7%2FZp88b5Wv6PPRq1IofJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KT2YDT5NG%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021732Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=72bb8cefe1368952bb57c0e5523582b23ed15554c3acab62b3eaeaa8a6c59e30',
        productId: '323',
      },
      {
        name: 'Gestion industrial',
        description: 'Fundamentos, herramientas e indicadores',
        price: '$50',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros%20variados/va%202.webp?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJHMEUCICEX6%2Bs%2FFZ3U6tp%2FNKwbUC8ikm4rX%2BQNI%2BIoXr8w2Uf5AiEAyQOlKZJnueiY1PvUn%2Bxo1gDGn8wUSmNTsh4O9pBU7X8q2wMIExAEGgw3OTIzODQxMjA1MzMiDJCsprKGh4u%2BZl63eCq4A3IbNBsMuM5E3siITC2NUuzBKGFS6efrDcn%2B5G4i4O%2B8Asb6dobITa%2BXRSkGtjqRjtjSWWYN3FrBgYHmy%2F7pvloh3FLG2w6yBkpPz%2FpxhJuwEk9%2BoQXJS%2FQksHw2r0xd%2BiVPmFYCTXprqDFfkE56wRhXJ9KK41vsXLnttoPSiMxU45mMekULrrpg9fpAIdupO1EiXNk8H3zE3nCtXy%2BFVxX%2BkcB52zNWxMi7DY28vItVEB5WFk5VRpTJcOy76QgyuygnVJsRvNMkWG90zp5Z2Q8TjVdw7o9CUiT6vyC9S0h1pw5QLHA8mw1x1WR6eOKoXC1PtnoqgICUwqmAPD185ffaZIiuNt84V4AXTLWneMwJCO2vhJX1l8HbV19tU4D0HnhI49G24DftTtfOhZxmSWlwuRYOeOBVysFaqyzKsi34mkascXBW8SOsUVDOBjlErh%2FdtVwEcxX1SR2tdExsemLI3nIvHkZTZXLJSyTZcgtgiBrAo5YSSmSBPJd%2FCcLoI%2FV%2FCStPbClHIWK%2BJcS%2BfXRWz0xmQFo%2Fh%2BWMMC%2BWWqcQ3GQa4FT55qpklT8tzxc%2BezRVPEPxvcMuMPW3m8sGOrcCj3r4lHdht4TtoH23qejHz3LqzjFWPoDBZEr6lb%2BBQTvwN9QQsBNo9L0COeP%2FSavGT%2F672ogAd40BMxYetwyrE2hEeH25fyFGX%2BaxqLrGYnsbGPcwZ32216QFpwFtErDHGr2x0xlWMkM5G15uYW%2B5n0DR7Pnh11cgewzga4X88vQc1ygb3S7QuxYGJwzf1M1SoMVCKBUTM6Bj4kdJZq4GmF%2FQ%2FCsqPA8Mu7kj18yd59voS6A16aNQMqtjLvLozEnEo2Ed09%2Bv8XCowX9cOdKeHB3%2But1WjCEPLjGzkuapCFxys95aApy1YByD%2FGHf%2Fijdh37kw6F7%2BYgod6g8JUHjh4TL4lXCRjYsYtXqDPFoyKdvPFfn4zJATOCRd8qY2avcGG9xHXCPfW7%2FZp88b5Wv6PPRq1IofJo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KT2YDT5NG%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021751Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=3c474587224475bb7946871221a5e5c6acab5d01085d934eafc24d6ec4c7164b',
        productId: '324',
      },
      {
        name: 'Fisica para ingenieria Civil',
        description: '101 problemas utiles',
        price: '$35',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros%20variados/va%203.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJIMEYCIQCXS00ldD%2FRpFOwkeVUN4JYEDh4wOxhIud7K8X1ociEOQIhAJBDwptih%2BTQhYGre02%2Fq0sYB3dw%2FbM6qSoPgMC6nx0lKtsDCBMQBBoMNzkyMzg0MTIwNTMzIgwF5ex5QwTnrlOWOj4quAO%2BFOxyvlnjAmtN1TCeOAwPE37%2Bl2cuhphn27QlCBlNT%2BpSKFdd2Omd8TtdPHQPOPrIoCwn6PLOj%2Fi9ZLt6wWZCIeiYpVQPGdJLASzqu%2FjjRcqNM2cLkyu%2F6Wj6Jo0XoRVvwlKOKb7BCwVCPnQ4S3e14YSzqjRoN1dE539Z21hELcgfnjrRU6vUmJbWpVAHDr3ORPeYI3Uejbt%2BmLE1r2GyXJsCjLrYA%2BgqUyJWtWyubQW0agKTuTBTSfQzDwXbeHAFLQ%2ByHWC%2F1ThxWrMi%2FTYqMXqyttfbrpaUN1TV%2Fe%2BvSvE%2BprteJ3QlUIyyzrbd8Iaq4adRJmYwGwmyIu%2FN4EsIqQQwTxtqUupPgNdoU8cY0aNOTECQon6lBiqmOILelEUM4TdOtPBICW5fBWaEFZhbimpmU28HKXaGpF%2BvmmURVkQkfXqqZHRJiu84n3If2UbG%2Fdj0dOYj4uvgvHaOF%2BA8sS5kQscjNjhzAh9yRmOhX4o0roo87WznIy%2BWxWA6K17IrUohfuaeLKIzLiUJif8%2B5fUtP%2FxGyRqwhOJ2ZcDYJmq51BzRq%2BJ4IFyw6CQpMhsUAyFkhdU7cDD1t5vLBjq2Ah9xMCXeYPuhgQUXpFa7PFUvQbUkgc3QFGwGj15o6nzPpjYlsiJs8u7bdANJUSbaDMyElsJeG3ltKH%2Fu9Lv6rD02q4WAFmYLKd78wOYda3IPufp1mQK5typsC%2BVDG%2Fg9%2FynJdRAOha3jxcBR5XxBz%2Bo%2FJXgpQmZX94yMKC%2By99JOM%2FxNfa5SBTIClvvz07JKKDjZtWxz8ykUVGtIzBNMbPSX1iRRvUDKMz%2FRFkZY8YO5pw5G09tJ4LVPWic7dbUd%2Bc5JGfmEGM9WSJQKDkRr%2Fp3bCs2bEsECheSsKVqZZFZsNeIU9EwlDvW3NhUf1W6AU7Ys861Ff0L3jzMKkUyndzfrfqQcYBAFggxLQeVeWskhLb3zANi8k5w5FK3HEyJ7aNabLXitN8mIs6L%2FQlvoIZLaNV%2Fwl0c%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KRJT73SDZ%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021809Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=f0c7d256ba2dd4ac73b6fae0b4e3a87f2caac25da9fc83dcd6af33bda8adc91b',
        productId: '325',
      },
      {
        name: 'ingenieria Ambiental',
        description: 'Por Javier Diaz',
        price: '$25',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros%20variados/va%204.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLWVhc3QtMSJIMEYCIQCXS00ldD%2FRpFOwkeVUN4JYEDh4wOxhIud7K8X1ociEOQIhAJBDwptih%2BTQhYGre02%2Fq0sYB3dw%2FbM6qSoPgMC6nx0lKtsDCBMQBBoMNzkyMzg0MTIwNTMzIgwF5ex5QwTnrlOWOj4quAO%2BFOxyvlnjAmtN1TCeOAwPE37%2Bl2cuhphn27QlCBlNT%2BpSKFdd2Omd8TtdPHQPOPrIoCwn6PLOj%2Fi9ZLt6wWZCIeiYpVQPGdJLASzqu%2FjjRcqNM2cLkyu%2F6Wj6Jo0XoRVvwlKOKb7BCwVCPnQ4S3e14YSzqjRoN1dE539Z21hELcgfnjrRU6vUmJbWpVAHDr3ORPeYI3Uejbt%2BmLE1r2GyXJsCjLrYA%2BgqUyJWtWyubQW0agKTuTBTSfQzDwXbeHAFLQ%2ByHWC%2F1ThxWrMi%2FTYqMXqyttfbrpaUN1TV%2Fe%2BvSvE%2BprteJ3QlUIyyzrbd8Iaq4adRJmYwGwmyIu%2FN4EsIqQQwTxtqUupPgNdoU8cY0aNOTECQon6lBiqmOILelEUM4TdOtPBICW5fBWaEFZhbimpmU28HKXaGpF%2BvmmURVkQkfXqqZHRJiu84n3If2UbG%2Fdj0dOYj4uvgvHaOF%2BA8sS5kQscjNjhzAh9yRmOhX4o0roo87WznIy%2BWxWA6K17IrUohfuaeLKIzLiUJif8%2B5fUtP%2FxGyRqwhOJ2ZcDYJmq51BzRq%2BJ4IFyw6CQpMhsUAyFkhdU7cDD1t5vLBjq2Ah9xMCXeYPuhgQUXpFa7PFUvQbUkgc3QFGwGj15o6nzPpjYlsiJs8u7bdANJUSbaDMyElsJeG3ltKH%2Fu9Lv6rD02q4WAFmYLKd78wOYda3IPufp1mQK5typsC%2BVDG%2Fg9%2FynJdRAOha3jxcBR5XxBz%2Bo%2FJXgpQmZX94yMKC%2By99JOM%2FxNfa5SBTIClvvz07JKKDjZtWxz8ykUVGtIzBNMbPSX1iRRvUDKMz%2FRFkZY8YO5pw5G09tJ4LVPWic7dbUd%2Bc5JGfmEGM9WSJQKDkRr%2Fp3bCs2bEsECheSsKVqZZFZsNeIU9EwlDvW3NhUf1W6AU7Ys861Ff0L3jzMKkUyndzfrfqQcYBAFggxLQeVeWskhLb3zANi8k5w5FK3HEyJ7aNabLXitN8mIs6L%2FQlvoIZLaNV%2Fwl0c%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KRJT73SDZ%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T021828Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=9a7988db9277bfd8714653c76360b8e19794885781bbc68ceecdd2d249453e0e',
        productId: '326',
      },
    ],
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Función para manejar el envío de reseña
  const handleAddReview = async (productId) => {
    if (!reviewText) {
      alert('Por favor, ingresa una reseña.');
      return;
    }

    const reviewData = {
      productId,
      review: reviewText,
      rating: 5, // Este ejemplo tiene una calificación de 5
    };

    try {
      const response = await fetch(`http://98.85.200.29/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();
      if (data.message) {
        alert('Reseña agregada con éxito');
        setReviewText(''); // Limpiar el campo de reseña
        fetchReviews(productId); // Refrescar las reseñas después de agregar una nueva
      } else {
        alert('Error al agregar reseña');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  // Función para obtener reseñas de un producto
  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(`http://98.85.200.29:5001/reviews?productId=${productId}`);
      const data = await response.json();
      setReviews(prevReviews => ({ ...prevReviews, [productId]: data.reviews }));
    } catch (error) {
      alert('Error al cargar reseñas');
    }
  };

  // Función para agregar al carrito
  const handleAddToCart = async (productId) => {
    const cartData = {
      productId, // Solo se pasa el productId
    };

    try {
      const response = await fetch('http://13.216.48.249:5002/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });

      const data = await response.json();
      if (data.message) {
        alert('Producto agregado al carrito');
        setCartItems([...cartItems, cartData]); // Agregar el producto al carrito
      } else {
        alert('Error al agregar producto al carrito');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  // Función para redirigir al carrito
  const handleViewCart = () => {
    navigate('/cart');
  };

  // Función para regresar a la página anterior
  const handleGoBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="products-container">
      <div className="category-menu">
        <button onClick={() => handleCategoryChange('matematica')}>Libros Matematicas</button>
        <button onClick={() => handleCategoryChange('fisica')}>Libros Fisica</button>
        <button onClick={() => handleCategoryChange('variado')}>Libros Variados</button>
      </div>

      <h1 className="category-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>

      <div className="products-grid">
        {products[selectedCategory].map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>

            <button onClick={() => handleAddToCart(product.productId)} className="add-to-cart-button">
              Añadir al carrito
            </button>

            <textarea
              placeholder="Escribe tu reseña"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="review-textarea"
            />
            <button onClick={() => handleAddReview(product.productId)} className="add-review-button">
              Reservar
            </button>

            <button onClick={() => fetchReviews(product.productId)} className="view-reviews-button">
              Ver reseñas
            </button>

            <div className="reviews-container">
              {reviews[product.productId]?.length > 0 ? (
                reviews[product.productId].map((review, idx) => (
                  <div key={idx} className="review-card">
                    <p><strong>{review.user}</strong></p>
                    <p>{review.review}</p>
                    <p><strong>Calificación:</strong> {review.rating} estrellas</p>
                  </div>
                ))
              ) : (
                <p>No hay reseñas para este producto.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleViewCart} className="view-cart-button">
        Ver mis reservas
      </button>

      <button onClick={handleGoBack} className="back-button">
        Regresar
      </button>
    </div>
  );
};

export default Products;
