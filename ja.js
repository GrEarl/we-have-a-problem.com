// Japanese translation draft: exact English HTML fragments or message templates -> Japanese.
// Changed or new English stays in English until its translation is reviewed and added.
// Keep markup, URLs, code, placeholders, and the signed proof message unchanged.
const JA = {
  'eMudhra Intermediate CA Compromise':
    'eMudhra中間認証局(CA)の秘密鍵の値が極端に小さいことによる侵害問題',
  'The private keys of eight eMudhra intermediate CA certificates, trusted by major root programs, have been compromised. Check whether your client is affected and how to protect it.':
    '主要なOSやブラウザなどで信頼されているeMudhra中間CA証明書の秘密鍵が8件侵害されました。OSやブラウザ，Goなどの言語処理系，ライブラリ，アプリケーションへの影響と対処方法を確認してください。',
  '<strong>20th October 2026</strong>':
    '<strong>2026年10月20日</strong>',
  'The private keys of eight eMudhra intermediate CA certificates have been compromised. They chain to roots trusted by the Mozilla, Microsoft, Apple and Chrome root programs and by many downstream trust stores.':
    'eMudhra中間CA証明書の秘密鍵が8件侵害されました。これらの証明書は，Mozilla，Microsoft，Apple，Chromeのルートプログラム（OSやブラウザの開発元が，どの認証局を信頼するかを審査し，採用・除外を決める制度）で採用されたルート証明書につながっています。それらのルート証明書は，多くのトラストストア（OSやブラウザ，言語処理系，ライブラリ，アプリケーションが信頼する証明書の一覧・保管場所）にも取り込まれています。クライアントは，そこにあるルート証明書を信頼の起点として，接続先の証明書を検証します。',
  '<a href="#proof">How do we know?</a>':
    '<a href="#proof">侵害の発見の経緯</a>',
  'To demonstrate that the keys are compromised, the original reporter Wayne signed the following message with the private key of each of the eight intermediate CAs and reported it to the Root Program Teams on the 17th of October:':
    '最初の報告者であるWayne氏は，秘密鍵が侵害されていることを示すため，8つの中間CAそれぞれの秘密鍵で以下のメッセージに署名し，10月17日にルートプログラムの各チームに報告しました。',
  '<a href="proof.zip">proof.zip</a> contains the message, and for each intermediate the certificate, its public key and a signature on the message. To verify with OpenSSL:':
    '<a href="proof.zip">proof.zip</a>には，このメッセージと，各中間CAの証明書，公開鍵，メッセージに対する署名が含まれています。OpenSSLで検証するには，次を実行します。',
  '<a href="#actions">What actions have been taken?</a>':
    '<a href="#actions">これまでの対策</a>',
  'The root programs and many downstream trust stores have taken action to protect their users. The certificates have been blocked in Firefox and Chrome since the 17th of October, on Microsoft platforms since the 20th and on Apple products since the 22nd.':
    'ルートプログラムの運営者や，その信頼リストを取り込んで使うソフトウェアの管理者は，利用者を保護するための対策を取りました。これらの証明書は，FirefoxとChromeでは10月17日から，Microsoftのプラットフォームでは20日から，Apple製品では22日からブロックされています。',
  'The issue was responsibly disclosed to downstream trust stores on the 19th of October. Many have already released updates or are in the process of releasing updates.':
    'この問題は，責任ある開示の手順に従って，10月19日に各ルートプログラムの信頼リストを取り込んで使うトラストストアの管理者へ通知されました。多くはすでに更新を公開しているか，公開に向けて対応を進めています。',
  '<a href="#consequences">What are the consequences?</a>':
    '<a href="#consequences">危惧される影響について</a>',
  'An attacker with the private key of any of the compromised intermediate CAs could impersonate any website or service.':
    '侵害された中間CAのいずれかの秘密鍵を持つ攻撃者は，任意のウェブサイトやサービスになりすますことができます。',
  'This has already been remediated by Mozilla, Microsoft, Apple, and Chrome for their users through their tools for distributing revocation information such as <a href="https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/">OneCRL</a>, <a href="https://hacks.mozilla.org/2025/08/crlite-fast-private-and-comprehensive-certificate-revocation-checking-in-firefox/">CRLite</a> and <a href="https://www.chromium.org/Home/chromium-security/crlsets/">CRLSets</a>.':
    'Mozilla，Microsoft，Apple，Chromeは，<a href="https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/">OneCRL</a>，<a href="https://hacks.mozilla.org/2025/08/crlite-fast-private-and-comprehensive-certificate-revocation-checking-in-firefox/">CRLite</a>，<a href="https://www.chromium.org/Home/chromium-security/crlsets/">CRLSets</a>などの失効情報を配信する仕組みによって，すでに利用者向けの対策を実施しています。',
  'The CA has also revoked the compromised intermediate certificates. However, many other clients do not consume revocation information and require software updates to ensure they no longer trust the compromised intermediates.':
    '認証局も，侵害された中間CA証明書を失効させました。ただし，ブラウザ以外の多くのクライアントは失効情報を利用していないため，侵害された中間CAを確実に信頼しなくなるよう，ソフトウェアを更新する必要があります。Goで作られたアプリケーションや，独自のCAバンドルを使うライブラリなども確認対象です。OSやブラウザが対策済みでも，アプリケーション側の証明書検証処理やライブラリの更新が必要になる場合があります。',
  '<a href="#check">Does your client still trust the compromised intermediates?</a>':
    '<a href="#check">私のクライアントは，侵害された中間CAをまだ信頼していますか？</a>',
  'Intermediate CA':
    '中間CA',
  'Chains to':
    'ルート証明書',
  'Result':
    'このブラウザでの接続結果',
  'Run check':
    'このブラウザで接続をテストする',
  'On 22nd October 2026, two chains marked <em>No CT</em> were added. Their leaf certificates were never logged to Certificate Transparency (CT), so clients that enforce CT reject them even if they still trust the intermediate. A successful connection to these hosts means the client trusts the compromised intermediates <em>and</em> does not enforce CT. As described <a href="#cause">below</a>, these are the clients that can be attacked without anyone noticing.':
    '2026年10月22日に，<em>No CT</em>と表示された2つの証明書チェーンを追加しました。これらのリーフ証明書はCertificate Transparency（CT）のログに一度も記録されていません。そのため，CTを必須とするクライアントは，中間CAをまだ信頼していてもこれらの証明書を拒否します。これらのホストへの接続に成功した場合，そのクライアントは侵害された中間CAを信頼しており，<em>かつ</em>CTを必須としていないことを意味します。<a href="#cause">後述</a>のとおり，これらは誰にも気づかれずに攻撃を受ける可能性があるクライアントです。',
  'To check curl or other command-line clients, run:':
    'curlなどのコマンドラインクライアントを確認するには，次を実行します。',
  'A certificate error means the client does not trust the compromised intermediates. To check whether the client also accepts certificates that were never logged to CT, run:':
    '証明書エラーが発生した場合，そのクライアントは侵害された中間CAを信頼していません。CTログに一度も記録されていない証明書も受け入れるかどうかを確認するには，次を実行します。',
  'Most browsers enforce CT, but many non-browser clients, including curl, do not which places them at greater risk.':
    'ほとんどのブラウザーはCTを必須としていますが，curlを含むブラウザー以外の多くのクライアントは必須としていないため，より高いリスクにさらされています。',
  'To check a trust store offline, <a href="chains.zip">chains.zip</a> contains the certificate chain served by each of the fourteen hosts above in PEM format, with instructions for verifying them with OpenSSL.':
    'トラストストアをオフラインで確認するために，<a href="chains.zip">chains.zip</a>には，上記14のホストそれぞれが提示する証明書チェーンをPEM形式で収録しています。OpenSSLで検証する手順も含まれています。',
  '<a href="#cause">What is known about the cause?</a>':
    '<a href="#cause">原因についての判明事項</a>',
  'The private keys for the intermediate certificates were incorrectly generated by the CA. This means that anyone can recover them from the certificates.':
    '認証局による中間CA証明書の秘密鍵の生成方法に誤りがありました。そのため，誰でも証明書から秘密鍵を復元できます。',
  'This would have been possible since the certificates were created in April 2025. There are no entries in the certificate transparency logs for these intermediates in that period, indicating that CT-enforcing clients like Firefox, Chrome, Edge and Safari could not have been attacked.':
    'この復元は，証明書が作成された2025年4月以降，可能だったと考えられます。その期間のCTログには，これらの中間CAに関する記録がありません。このことは，Firefox，Chrome，Edge，SafariのようにCTを必須とするクライアントは，この攻撃を受けることがなかったことを示しています。',
  'However, many clients outside of the browser ecosystem do not enforce Certificate Transparency. We do not know if attackers exploited the flawed key generation to target these clients.':
    'ただし，ブラウザーのエコシステムに属さない多くのクライアントは，Certificate Transparencyを必須としていません。攻撃者が鍵生成の不備を悪用し，これらのクライアントを標的にしたかどうかは不明です。',
  'Further technical information about the cause is captured in the <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=2083449">initial incident report</a> in Mozilla\'s bug tracker.':
    '原因に関する詳しい技術情報は，Mozillaのバグトラッカーの<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=2083449">最初のインシデント報告</a>に記載されています。',
  '<a href="#unpatched">Which clients aren\'t yet patched?</a>':
    '<a href="#unpatched">未対応クライアントの状況</a>',
  'The servers behind the <a href="#check">checker</a> record how many times each user-agent connects successfully, meaning it still trusts the compromised intermediates. Only these counts are recorded. See the <a href="https://statistics-emudhra.we-have-a-problem.com/">user-agent statistics</a>.':
    '<a href="#check">確認ツール</a>のサーバーは，各ユーザーエージェントが接続に成功した回数を記録しています。接続の成功は，そのクライアントが侵害された中間CAをまだ信頼していることを意味します。記録されるのは，この回数のみです。<a href="https://statistics-emudhra.we-have-a-problem.com/">ユーザーエージェントの統計</a>を参照してください。',
  'A <a href="https://statistics-emudhra.we-have-a-problem.com/stats.json">JSON dump</a> with more detail, including counts for each JA4 fingerprint, is also available.':
    'JA4フィンガープリントごとの回数など，より詳しい情報を含む<a href="https://statistics-emudhra.we-have-a-problem.com/stats.json">JSONデータ</a>も公開されています。',
  '<a href="#intermediates">Which intermediates were compromised?</a>':
    '<a href="#intermediates">侵害された中間CAの一覧</a>',
  '<a href="impacted-intermediates.json">impacted-intermediates.json</a> lists the eight intermediates and their Sectigo cross-signs. <a href="roots.json">roots.json</a> lists the roots they chain to.':
    '<a href="impacted-intermediates.json">impacted-intermediates.json</a>には，8つの中間CAと，Sectigoによるそれらのクロス署名証明書が一覧化されています。<a href="roots.json">roots.json</a>には，それらがつながるルート証明書が一覧化されています。',
  '<a href="#operators">What actions can trust store operators take?</a>':
    '<a href="#operators">トラストストア運用者向けの対策</a>',
  'Please see <a href="https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE">this thread</a> in Mozilla\'s dev-security-policy forum.':
    'Mozillaのdev-security-policyフォーラムの<a href="https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE">こちらのスレッド</a>を参照してください。',
  '<a href="#users">What actions can users take?</a>':
    '<a href="#users">利用者向けの対策</a>',
  'Users should update their browsers and operating systems to the latest versions as soon as possible.':
    'ブラウザとOSを，できるだけ早く最新バージョンに更新してください。開発者・管理者は，言語処理系やライブラリと，それらを組み込んだアプリケーションの対応状況も確認してください。Goなどのコンパイル済みアプリケーションでは，対策済みのツールチェーンで再ビルドし，更新したバイナリを配布・デプロイする必要がある場合があります。',
  '<a href="#developers">Who has patched?</a>':
    '<a href="#developers">各ソフトウェアの対応状況</a>',
  'Pending entries are listed at the end of each group.':
    '修正版の提供を待っている項目は，各グループの末尾に記載しています。',
  '<a href="#patched-os">Operating systems and distributions</a>':
    '<a href="#patched-os">OSとディストリビューション</a>',
  'Software':
    'ソフトウェア',
  'Patched version':
    '修正済みバージョン',
  '<a href="https://bugs.debian.org/1151413">Same as Debian</a>':
    '<a href="https://bugs.debian.org/1151413">Debianと同じ</a>',
  'pending':
    '修正版の提供待ち',
  '<a href="#patched-bundles">Root store bundles and libraries</a>':
    '<a href="#patched-bundles">ルート証明書の一覧とライブラリ</a>',
  '<a href="#patched-runtimes">Language runtimes</a>':
    '<a href="#patched-runtimes">言語処理系・ランタイム</a>',
  '<a href="#patched-tools">Applications and tools</a>':
    '<a href="#patched-tools">アプリケーションとツール</a>',
  'Add more at <a href="https://github.com/galadran/we-have-a-problem.com">github.com/galadran/we-have-a-problem.com</a>.':
    '追加情報は<a href="https://github.com/galadran/we-have-a-problem.com">github.com/galadran/we-have-a-problem.com</a>へお寄せください。',
  '<a href="#workarounds">Are there workarounds until patches are available?</a>':
    '<a href="#workarounds">修正版が提供されるまでの回避策</a>',
  'macOS curl, git, and Python':
    'macOSのcurl，git，Python',
  'macOS blocks the compromised intermediates, but the built-in <code>curl</code>, <code>git</code>, <code>python3</code>, <code>perl</code>, <code>ruby</code>, and <code>openssl</code> verify certificates against <code>/etc/ssl/cert.pem</code> without checking revocation, and that file has not been updated. To remove the affected roots from it, run:':
    'macOSは侵害された中間CAをブロックしていますが，標準搭載の<code>curl</code>，<code>git</code>，<code>python3</code>，<code>perl</code>，<code>ruby</code>，<code>openssl</code>は，失効を確認せずに<code>/etc/ssl/cert.pem</code>で証明書を検証します。このファイルはまだ更新されていません。影響を受けるルート証明書をこのファイルから削除するには，次を実行します。',
  'The built-in <code>pip3</code>, and the <code>pip</code> in virtual environments created from the built-in <code>python3</code>, use their own outdated copy of the roots instead. To make them use the fixed system file, run:':
    '標準搭載の<code>pip3</code>と，標準搭載の<code>python3</code>から作成した仮想環境内の<code>pip</code>は，代わりに独自の古いルート証明書のコピーを使用します。修正したシステムファイルを使わせるには，次を実行します。',
  'For nix-darwin users, please <strong>additionally</strong> follow NixOS instructions.':
    'nix-darwinをお使いの場合は，<strong>加えて</strong>NixOSの手順にも従ってください。',
  'Until a distribution ships an updated <code>ca-certificates</code> package, expert users can distrust the affected roots in the system trust store. This is NOT recommended for ordinary users.':
    'ディストリビューションが更新済みの<code>ca-certificates</code>パッケージを提供するまでは，専門知識のある利用者は，システムのトラストストアで影響を受けるルート証明書を信頼しないように設定できます。一般の利用者には推奨しません。',
  'On Debian and Ubuntu, run as root:':
    'DebianとUbuntuでは，root権限で次を実行します。',
  'If you use the Java certificate store, it might fall out of sync with your system certificate store. To sync the stores, run as root:':
    'Javaの証明書ストアを使用している場合，システムの証明書ストアと同期しなくなることがあります。両者を同期するには，root権限で次を実行します。',
  'On Alpine, run as root:':
    'Alpineでは，root権限で次を実行します。',
  'On Fedora, RHEL, CentOS Stream, Rocky Linux, AlmaLinux and Amazon Linux 2023, run as root:':
    'Fedora，RHEL，CentOS Stream，Rocky Linux，AlmaLinux，Amazon Linux 2023では，root権限で次を実行します。',
  'On openSUSE and SLES, run as root:':
    'openSUSEとSLESでは，root権限で次を実行します。',
  'On Arch Linux, run as root:':
    'Arch Linuxでは，root権限で次を実行します。',
  'On NixOS, add to your configuration:':
    'NixOSでは，設定に次を追加します。',
  'Microsoft has shipped blocks for these certificates through Windows\' <a href="https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/certificate-trust#automatic-certificate-trust-list-updates">automatic certificate trust list updates</a>. Machines that receive these updates don\'t need this workaround. This script lets administrators block the compromised certificates locally on machines that do not, for example those that are offline or have automatic updates disabled.':
    'Microsoftは，Windowsの<a href="https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/certificate-trust#automatic-certificate-trust-list-updates">証明書信頼リストの自動更新</a>を通じて，これらの証明書をブロックする更新を配信しています。これらの更新を受け取る端末には，この回避策は不要です。このスクリプトを使うと，管理者は，オフラインの端末や自動更新が無効な端末など，更新を受け取れない端末で，侵害された証明書をローカルにブロックできます。',
  '<strong>This mitigation is not recommended for enterprise-managed devices.</strong> Your IT department will manage the rollout; contact them before applying local changes.':
    '<strong>この緩和策は，企業が管理する端末には推奨しません。</strong>IT部門が展開を管理するため，ローカルで変更を適用する前にIT部門へ連絡してください。',
  'Download and inspect <a href="Block-EmudhraCompromisedCA.ps1"><code>Block-EmudhraCompromisedCA.ps1</code></a>, then run it from an elevated PowerShell terminal. Requires PowerShell 5.1 or later and the built-in Windows PKI module. This command bypasses execution policy for this process only; it does not change the machine\'s policy. Organization-enforced policies may still prevent execution.':
    '<a href="Block-EmudhraCompromisedCA.ps1"><code>Block-EmudhraCompromisedCA.ps1</code></a>をダウンロードして内容を確認し，管理者権限のPowerShellターミナルから実行してください。PowerShell 5.1以降と，Windows標準のPKIモジュールが必要です。このコマンドは，このプロセスに限って実行ポリシーを回避し，端末のポリシーは変更しません。組織が強制するポリシーによっては，実行が阻止される場合があります。',
  'The script imports its 16 compromised intermediates and cross-signs into <code>LocalMachine\\Disallowed</code> (Untrusted Certificates).':
    'このスクリプトは，侵害された中間CA証明書とクロス署名証明書，計16件を<code>LocalMachine\\Disallowed</code>（信頼されていない証明書）にインポートします。',
  'This mitigation applies to clients using the Windows operating system certificate trust stores and chain validation (including Schannel TLS and Authenticode). It adds blocks to Untrusted Certificates without modifying Trusted Root Certification Authorities. Applications using independent CA bundles still need their own updates.':
    'この緩和策は，Windowsの証明書トラストストアとOSによる証明書チェーン検証を利用するクライアント（Schannel TLSやAuthenticodeを含む）に適用されます。「信頼されたルート証明機関」を変更せず，「信頼されていない証明書」にブロックを追加します。独自のCAバンドルを使用するアプリケーションは，引き続き個別の更新が必要です。',
  'On NetBSD 10 and later, run as root:':
    'NetBSD 10以降では，root権限で次を実行します。',
  'On FreeBSD 14 or later, run the following commands as root:':
    'FreeBSD 14以降では，root権限で次のコマンドを実行します。',
  'Site published by <a href="https://github.com/dennisjackson">Dennis Jackson</a>. This site is the work of <a href="https://github.com/galadran/we-have-a-problem.com/graphs/contributors">many contributors</a> from the community. The source is on <a href="https://github.com/galadran/we-have-a-problem.com">GitHub</a> and PRs are welcome.':
    'このサイトは<a href="https://github.com/dennisjackson">Dennis Jackson</a>が公開し，コミュニティの<a href="https://github.com/galadran/we-have-a-problem.com/graphs/contributors">多くの貢献者</a>が制作しています。ソースコードは<a href="https://github.com/galadran/we-have-a-problem.com">GitHub</a>で公開しており，PRを歓迎します。<br>この一時的な和訳はGrEarlによって提案されています。',
  'No Certificate Transparency: this certificate was never logged to CT and has no SCTs. Clients that enforce CT, such as Chrome, Safari and Firefox, reject it even if they still trust the intermediate.':
    'Certificate Transparencyなし：この証明書はCTログに一度も記録されておらず，SCTもありません。Chrome，Safari，Firefoxなど，CTを必須とするクライアントは，中間CAをまだ信頼していてもこの証明書を拒否します。',
  '⚠️ Inconclusive (unexpected HTTP {status} response)':
    '⚠️ 判定できません（テスト用の応答を確認できませんでした：HTTP {status}）',
  '❌ Insecure':
    '❌ 接続成功（侵害された中間CAを信頼しています）',
  '⚠️ Inconclusive (timed out)':
    '⚠️ 判定できません（時間内に応答がありませんでした）',
  '⚠️ Inconclusive (browser reports being offline)':
    '⚠️ 判定できません（ブラウザがオフラインと報告しています）',
  '✅ Did not connect':
    '✅ 接続されませんでした（証明書拒否・通信エラーの区別はできません）',
  'not yet checked':
    'まだテストしていません',
  'checking…':
    '接続をテスト中…',
  'Your browser trusted {n} of {total} compromised certificate chains.':
    '接続テスト{total}件のうち，{n}件で侵害された中間CAを使った接続に成功しました。この検査では，証明書を拒否して接続しないことが期待されます。ただし，通信エラーでも接続できないため，この結果だけで安全とは断定できません。確認できるのはこのブラウザの状態だけです。Go製アプリなど，別のソフトウェアは個別に確認してください。',
  ' {unknown} checks were inconclusive, so the result is incomplete. Please try again later, or from a network without a TLS-intercepting proxy.':
    ' {unknown}件は判定できませんでした。表の各行で理由を確認してください。通信状態を確認して再試行するか，通信を中継・検査するプロキシを経由しないネットワークからお試しください。',
  'Run again':
    'もう一度接続をテストする',
  'pending<br>(1.4.16, 1.6.0)':
    '修正版の提供待ち<br>(1.4.16, 1.6.0)',
};
