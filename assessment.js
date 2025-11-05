'use strict' ;
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click', //クリックイベント
   () => { //無関数でアロー関数、イベント検知したら実行される
    const userName = userNameInput.value;
      if(userName.length === 0) {
        //名前が空のときは処理を終了する
        return; //関数の処理を終了する(*引数を出す意もある)
      }
      //診断結果エリアの作成
      resultDivision.innerText = ''; //divタグを空文字で上書きすることで空にしている
      const header = document.createElement('h3');
      header.innerText = '診断結果'; //タグの内側のテキストを設定
      resultDivision.appendChild(header); //divタグの子要素として追加

      const paragraph = document.createElement('p'); //pタグの作成
      const result = assessment(userName); //診断結果を作成
      paragraph.innerText = result; //pタグの内側のテキストを作成
      resultDivision.appendChild(paragraph); //divタグの子要素としてpタグを追加
    console.log(assessment(userName));

    //ツイートエリアの作成
    tweetDivision.innerText = '' //tweetのdivタグも空にする
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('date-text', '診断結果の文章');
    anchor.innerText = '#あなたのいいところを投稿する';
    tweetDivision.appendChild(anchor); //divの子要素として追加

    const script = document.createElement('script'); //scriptタグ
    script.setAttribute('scr', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script); //divの子要素として追加
  }
);

userNameInput.addEventListener( //イベント検知の追加
  'keydown', //キー入力
  (event) => {
    if (event.code === 'Enter');{ //押されたキーがEnterなら
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
] ;

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment (userName){
    //全文字コード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
      sumOfCharCode = sumOfCharCode += userName.charCodeAt(i);
    }
    //文字コードの番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('###userName###',userName);
    return result; //診断結果を返す
}

//テストを行う関数
function test(){
  console.log('診断結果の文章テスト');

  //蒼依
  console.log('蒼依');
  console.assert(
    assessment('蒼依')===
    '蒼依のいいところは思いやりです。蒼依に気をかけてもらった多くの人が感謝しています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //連記
  console.log('連記');
  console.assert(
    assessment('連記') ===
    '連記のいいところは節度です。強引すぎない連記の考えに皆が感謝しています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文章テスト終了');

}
test();