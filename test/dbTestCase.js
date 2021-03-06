const dbTest = require("../util/db");


let data = [
    {
        source: "naverCafe",
        herf: "https://cafe.naver.com/poglcc/2087?art=aW50ZXJuYWwtY2FmZS13ZWItc2VjdGlvbi1zZWFyY2gtbGlzdA.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiYXJ0aWNsZUlkIjoyMDg3LCJjYWZlVXJsIjoicG9nbGNjIiwiaXNzdWVkQXQiOjE2MjI2ODI0MTYyMTF9.5liu62mEZ1uR_BwzAAfyaTWJ1vmCsgj2h7WN-1lVb3w",
        postData: {
            title: "5/28(금) 반지 업무일지",
            articleUploadDate: "2021-05-28",
            articleAuthor: "반지",
            mainText: "(사)공동육아와공동체교육 교사 선언  \n" +
            "\n" +
            "1. 나는 공동육아와 공동체교육 교사이다.   \n" +
            "\n" +
            "2. 나는 몸과 마음을 건강하게 지킨다.   \n" +
            "\n" +
            "3. 나는 아이들의 자연스러운 성장을 믿으며, 그들의 인권을 존중한다.   \n" +
            "\n" +
            "4. 나는 동료에게 서로의 성장을 돕는 힘이 된다.   \n" +
            "\n" +
            "5. 나는 살아 움직이고 실천하는 교사회를 만든다.   \n" +
            "\n" +
            "6. 나는 배움을 앎에, 앎을 삶에 일치시킨다.   \n" +
            "\n" +
            "7. 나는 생명을 살리는 생태적인 삶을 실천한다.   \n" +
            "\n" +
            "8. 나는 서로의 다름을 존중하며 더불어 살아간다.   \n" +
            "\n" +
            "9. 나는 육아의 사회화를 지원하는 교사로서 자긍심을 갖는다.   \n" +
            "\n" +
            "10. 나는 삶을 함께 누리는 공동체 문화를 만들어간다.   \n" +
            "\n" +
            "​\n" +
            "\n" +
            "# 구립오금동지역아동센터 교사상 # 매일매일 되새깁니다.  \n" +
            "\n" +
            "1. 본인의 걱정은 잠시 접어두고 아이들에게 집중하려고 노력하는 교사.  \n" +
            "\n" +
            "2. 무릎을 꿇고, 몸을 숙이고, 앉아서 아이들과 눈높이를 맞추는 교사.  \n" +
            "\n" +
            "3. 아이들이 좋은 선택을 하도록 도와주는 교사.  \n" +
            "\n" +
            "4. 아이들이 꿋꿋한 태도를 가지도록 용기를 주는 교사.  \n" +
            "\n" +
            "5. 아이들이 자신감을 갖도록 격려하고 인정해 주는 교사.  \n" +
            "\n" +
            "6. 좋은 음식, 좋은 말, 좋은 기분으로 아이들을 대하는 교사.  \n" +
            "\n" +
            "7. 잘못했을 때 사과하고, 고마울 때 고마움을 표현하는 교사.  \n" +
            "\n" +
            "8. 말하기보다는 귀를 열어두는 교사.  \n" +
            "\n" +
            "9. 아이들과 한 약속을 지키는 교사.  \n" +
            "\n" +
            "10. 신뢰를 바탕으로 아이들의 의견을 들어주고 존중해주는 교사  \n" +
            "\n" +
            "11. 아이들이 다른 사람을 돕도록 격려해주는 교사.  \n" +
            "\n" +
            "​\n" +
            "\n" +
            "1. 식사 구분 및 인원\n" +
            "\n" +
            "- 석식 / 아동 20명 외 교사 1명\n" +
            "\n" +
            "​\n" +
            "\n" +
            "2. 오늘의 메뉴 및 후식\n" +
            "\n" +
            "- 토마토스파게티, 브로콜리크림스프, 바게트빵, 케이준치킨샐러드, 하트피클, 파인애플\n" +
            "\n" +
            "​\n" +
            "\n" +
            "3. 조리후기\n" +
            "\n" +
            "- 알레르기 아동을 위해 혹시나 하고 토마토스파게티 소스를 확인해 보니 우유성분이 들어 있다고 나와 있어서 토마토소스를 넣기 전 볶은 재료를 덜어 내어 올리브유를 넣고 별도로 간을 맞춰 스파게티면에 토핑해 주었음.(다음에 토마토스파게티를 할 때는 우유가 들어 있지 않은 토마토스파게티 소스가 있는지 찾아 봐서 준비해야 할 것임-찬0이 아버님이 지난번 크림스파게티 조리 했을 때 스파게티 생면에 계란 성분이 들어 있어서 소면을 별도로 삶아 비빔국수를 만들어 먹였다고 말씀 드리니일반 시중에 나오는 일반 건면으로 토마토스파게티를 해서 먹이면 괜찮다고 하셨음)\n" +
            "\n" +
            "- 브로콜리크림스프 베이스에도 우유가 들어 있다고 봉지 겉면에 원재료 설명이 나와 있어서 배식하지 못하는 이유를 설명해 줌.\n" +
            "\n" +
            "- 케이준치킨샐러드용 치킨이 너무 빵가루 부스러기가 많아서 다음에는 다른 텐더스틱치킨을 찾아 보고 주문을 해야 할 것임.\n" +
            "\n" +
            "- 케이준샐러드용 방울토마토가 1Kg*2팩을 배송해 줬는데 너무 많아서 한 팩만 사용함.(다음에는 한 팩만 주문 할 것)\n" +
            "\n" +
            "- 스파게티에 곁들여 주는 바게트빵이 너무 큰사이즈의 빵이 배송이 와서 아이들 급식에 주고도 한 토막씩을 포장해서 귀가 길에 보냈음.(빵이 250g*6개가 와서 크게 썰어 배식을 했어도 세 개가 남아서 가정에 보내게 되었음) \n" +
            "\n" +
            "- 유0이가 학원에 몇 시에 가는지 알려 주지 않고 6시에 주방에 와서 지금 먹을 수 있느냐고 물어서 다행히도 거의 조리가 된 상태고 면만 삶으면 되어서 부지런히 조리해서 먼저 챙겨 주기는 했지만 매우 분주 했음(다음에는 센터 오면 학원에 가야 하는 시간을 먼저 알려 달라고 함)\n" +
            "\n" +
            "​\n" +
            "\n" +
            "4. 공유사항\n" +
            "\n" +
            "- 공공근로 일자리 물망초께서 5월 31일 월요일 코로나백신 맞고 6월 1일 화요일까지 쉬고 수요일에 출근 예정.\n" +
            "\n" +
            "​\n" +
            "\n" +
            "5. 기타\n" +
            "\n" +
            "- 설거지 및 주방 정리 / 수저 소독 / 음식물쓰레기 스티커 부착 및 배출",
            comments: [
                "아이가 몇살이예요?",
                "5살이요^^",
                "키즈마린 추천하고 싶네요..",
                "02.420.0065 인데요 혹시 모르니 운영여부 확인해보셔요~ 코시국 때문에ㅜ",
                "오오 정성스런 답변 완전 감사해요!! 알아볼게요 키즈마린 ^^",
                "네네^^ 도움이 되셨으면 좋겠습니다",
                "정보얻고갑니자",
                "스위스 키즈베이 잠실점 추천드립니다만 윗분말처럼 문의가\n필요할듯 싶어용!",
                "좋은정보감사합니다.",
                "저도 수영장 찾고 있었는데 알아봐야 겠네요^^"
            ]
        }
    },
    {
        source: "naverCafe",
        herf: "https://cafe.naver.com/thegoldeninvestment/188876?art=aW50ZXJuYWwtY2FmZS13ZWItc2VjdGlvbi1zZWFyY2gtbGlzdA.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiYXJ0aWNsZUlkIjoxODg4NzYsImNhZmVVcmwiOiJ0aGVnb2xkZW5pbnZlc3RtZW50IiwiaXNzdWVkQXQiOjE2MjI2ODI0MTYyMTJ9.fNt_Mgwbd7eWyy24bHpvAzladP8UphgLrQHDKO3QwOE",
        postData: {
            title: "★ 저점 매수 진입시켜드린 \"하이제6호스팩\" 2연속 상한가! 60% 수익 돌파 ! 축하드려요! 이번 진입 재료는 백신 접종 본격화 수혜주!",
            articleUploadDate: "2021-05-28",
            articleAuthor: "세미",
            mainText: "★ 저점 매수 진입시켜드린 \"하이제6호스팩\" 2연속 상한가! 60% 수익 돌파 ! 축하드려요!\n" +
            "\n" +
            "​\n" +
            "\n" +
            "이번 진입 재료는 백신 접종 본격화 수혜주! \n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "https://youtu.be/CFCQVtEpzbY <<< 링크 클릭 후 접속\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "https://youtu.be/CFCQVtEpzbY <<< 좋아요+구독 ~!\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "27일부터 65세 이상 신종 코로나바이러스 감염증(코로나19) 예방접종이 시작되면서 정부의 '상반기 1300만명 1차 접종' 목표 달성에 성큼 다가섰다.\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "권준욱 중앙방역대책본부 제2본부장은 28일 정례브리핑을 통해 \"전국 1만3000여 병·의원(위탁의료기관)에서 65세 이상 74세 어르신을 대상으로 코로나19 예방접종을 시작한 어제 하루 71.1만 명(5.28일 0시 기준)이 예방접종을 했다\"고 밝혔다.\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "1차 접종은 65.7만 명으로 2월26일 코로나19 예방접종을 시작한 이래 일일 1차 접종 최고치를 기록했다. 인구 대비 9.1%인 468.9만 명이 1차 접종을 완료했다.\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "==================\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#상한가 #주식책추천 #주식하는법 #이상투자그룹 #주식사는법\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#주식사이트 #증권계좌개설 #주식초보강의 #주식기초강의 #코스피\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#국내증시 #삼성전자 #코스닥 #일신바이오 # 동신건설 #브레인콘텐츠\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#박셀바이오 #sk하이닉스 #이상투자 #유튜브채널 #주식입문서 #주식초보\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#주식기초 #경남바이오파마 #진양폴리 #사이버원 #세동 #가온전선\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#진양화학 #페이퍼코리아 #하이트론 #자안 #비보존 헬스케어 #진흥기업 #진양홀딩스\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#골드퍼시픽 #손오공 #한국선재 #이스타코 #진양산업 #웅진\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#한국전자홀딩스 #이오플로우 #모나미 #멜파스 #코맥스 #넥스턴 #진양제약 #피에스텍\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#러셀 #이지바이오 #에코캡 #한빛소프트 #이그잭스 #신성통상\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#까뮤이앤씨 #비비안 #에이치엘비생명과학 #이아이디 #한일화학\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#엔케이물산 #현대퓨처넷 #wi #삼표시멘트 #제이엠티 #대창솔루션\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#로지시스 #stx중공업 #아이원스 #신풍제지 #프레스티지바이오 #덱스터 #현대바이오\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#엔에스엔 #보해양조 #서플러스글로벌 #대한전선 #쌍방울 #이스트아시아홀딩스 #세진중공업\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#더블유게임즈 #성보화학 #케이씨피드 #the e&m #케이씨피드 #인스코비 #위지트\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#에이치엘비 #바른손 #갤럭시아머니트리 #유니셈 #바이넥스 #gs건설 #kmh하이텍 #엘비세미콘\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#lg전자 #초록뱀 #신일전자 #대원전선 #오성첨단소재 #서희건설 #한송네오텍 #웅진 #에스트래픽 #형지I&C\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#자이언트스텝 #삼성중공우 # 대구백화점 #한화손해보험 #에스티아이 #서연 #SK바이오사이언스 #코퍼스코리아\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#금강공업 #SBI인베스트 #SNK #위지트 #우리이앤엘 #파인디지털 #크라운해태홀딩스 #우리기술투자\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#이더블유케이 #아이엠이연이 #퓨쳐켐 #우리조명 #비덴트 #티사이언티픽 #현대바이오 #휴니드 #에이티넘인베스트\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#소리바다 #원풍 #삼강엠앤티 #한화투자증권\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#셀바스헬스케어 #yg plus #빅히트 #보광산업 #홈센타홀딩스 #해마로푸드서비스 #신라섬유\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#갤럭시아머니트리 #진양폴리 #진양화학 #위지트 #에이프로젠 kic\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#콤텍시스템 #흥국에프엔비 #코렌 #푸드웰 #휘닉스소재 #알루코 #드림시큐리티\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#미래에셋증권우 #미래에셋벤처투자 #디피씨 #hmm #한화투자증권 #ne능률 #우리기술투자 #sk증권 #카카오\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#웅진씽크빅 #sk증권 #sbi인베스트먼트 #손오공 #티비씨 #웅진씽크빅 #아주ib투자 #알로이스 #이디티 #현우산업\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#유안타증권 #시스웍 #대성파인텍 #동국알앤에스 #우리기술투자 #문배철강 #디피씨 #ts인베스트먼트\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#오리엔트정공 #대성창투 #휴마시스 #한화투자증권 #미래에셋벤처투자 #보성파워텍\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#에이티넘인베스트 #유진투자증권 #보해양조 #ihq #디지틀조선 #성호전자 #위지트\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#대한전선 #드림시큐리티 #한화생명 #신성이엔지 #백광산업 #한국테크놀로지\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#knn #웅진 #ktb투자증권 #인콘 #sg충방 #에넥스 #대영포장\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#컴퍼니케이 #부국철강 #hmm #포인트엔지니어링 #수산중공업\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#경남스틸 #인바이오젠 #아이티센 #유화증권 #아이에이\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#우리기술 #라온시큐어 #hb테크놀러지 #서한 #휘닉스소재 #다날 #lg디스플레이\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#랩지노믹스 #dsc인베스트먼트 #태웅로직스 #메리츠증권 #영화금속\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#미래에셋증권 #덕성 #상상인증권 #삼성중공업 #썸에이지 #우리금융지주\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#케이씨티 #비덴트 #웰크론한텍 #윌비스 #혜인 #ni스틸 #대한해운 #부방 #상지카일룸\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#코퍼스코리아 #알톤스포츠 #화성밸브 #아이크래프트 #케이탑리츠 #케이맥 #알티캐스트 #오하임아이엔티\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#삼부토건 #사조씨푸드 #동양철관 #푸른저축은행 #초록뱀 #삼천리자전거 #까뮤이앤씨 #백산\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#코렌 #sv인베스트먼트 #티케이케미칼 #갤럭시아머니트리 #진흥기업 #원익큐브 #티사이언티픽 #노루페인트\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#sm life design #nh투자증권 #팬오션 #진양산업 #동양물산 #시티랩스 #미래에셋증권우 #아이엠 #대한그린파워 #이씨에스 #크라운해태홀딩스 #필로시스헬스케어 #알서포트 #나노캠텍 #남선알미늄 #kr모터스 #깨끗한나라 #lg유플러스 #엔지스테크널러지 #우정바이오 #극동유화 #화일약품 #엠게임 #콤텍시스템 #이그잭스 #필룩스 #흥국에프엔비 #사조동아원 #유안타증권우 #오리엔트바이오 #기업은행 #써니전자 #레이크머티리얼즈 #씨아이테크 #한일사료 #서연 #파인텍 #우진비앤지 #셀바스헬스케어 #슈프리마에이치큐 #대원전선 #대원강업 #new #엠에스오토텍 #한국정보인증 #kt&g #이지바이오 #ktcs #어보브반도체 #제주은행 #네ㅔ오위즈홀딩스 #sk바이오사이언스 #원익홀딩스 #기가레인 #아즈텍wb #와이지엔터테인먼트 #디앤씨미디어 #신화실업 #넥스 트bt #서울바이오시스 #수산아이앤티 #피에스케이홀딩스 #일신석재 #삼진엘앤디 #키움증권 #지란시교시큐리티\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#한국선재 #신풍제지 #삼표시멘트 #센트럴바이오 #케이사인 #대우건설 #삼화네트웍스 #유니셈 #cmg제약 #포스코엠텍 #동국제강 #한국전력 #금강철강 #남성 #엑세스바이오 #제이시스메디칼 #kmh하이텍 #오로라 #pn풍년 #lg전자 #지트리비앤티 #유니온 #한신기계 #모비스 #이수앱지스 #루멘스\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#지니틱스 #세원 #제주반도체 #sk하이닉스 #코세스 #아이오케이 #sga솔루션즈 #한국전자홀딩스 #두산인프라코어 #sfa반도체 #gh신소재 #메가엠디 #성창기업지주 #에이텍티앤 #아이원스 #태평양물산 #대동공업 #팜스토리 #엘앤에프 #케이피엠테크#화승인더 #대성엘텍 #자이언트스텝 #해태제과식품\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#지어소프트 #동방 #바이온 #형지엘리트 #휴림로봇 #아비코전자 #imbc #케이에스피 #hsd엔진 #엔시스 #대신정보통신 #bnk금융지주 #에스맥 #모베이스 #팬엔터테인먼트 #룽투코리아 #형지 i&c #메타랩스 #에이디칩스 #진양폴리 #비보존 헬스케어 #우리손에프앤지 #쇼박스 #바디텍메드 #the e&m\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#홈센타홀딩스 #gs글로벌 #엔비티 #스카이이앤엠 #크라운제과 #코스모신소재 #한국토지신탁 #러셀 #대창 #이건홀딩스 # 쌍용정보통신 #cj씨푸드 #와이제이엠게임즈 #이스타코 #오성첨단소재 #유안타제6호스팩 #대한항공 #구영테크 #한송네오텍 #한국가구 #대원미디어 #인터파크 #쏠리드 #금호에이치티 #sga #진원생명과학 #넥스트사이언스 #모베이스전자 #기아 #에스코넥 #롯데손해보험 #신한지주 #네오이뮨텍 #한국전자인증 #코오롱생명과학 #씨에스윈드 #바이오니아 #nh투자증권우 #금양 #알체라 #현대공업 #디엔에이링크 #모바일어플라이언스 #율호 #테라사이언스 #엠에프엠코리아 #디딤 #부광약품 #한국가스공사 #디지캡 #한창 #하츠 #한국자산신탁 #유성티엔에스 #아난티 #보락 #유에스티 #셀트리온 #삼성sdi #한양증권우 #스튜디오산타클로스 #롯데관광개발 #한국전자금융 #영풍정밀 #jb금융지주 #우양 #서원 #퍼스텍 #kctc #대덕전자 #카이노스메드 #브리지텍 #중앙백신 #엔브이에이치코리아 #강원랜드 #kg이니시스 #코리아에셋투자증권 #kmh #kg모빌리언스 #골프존뉴딘홀딩스 #삼강엠앤티 #동성화 인텍 #삼성전기 #티웨이항공 #에너토크 #aj네트웍스 #모나리자 #휴켐스\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#우리넷 #서연탑메탈 #서희건설 #이베스트투자증권 #광명전기 #엠벤처투자 #이화공영 #모헨즈 #bgf #대원화성 #피에스텍 #바이오로그디바이스 #삼보산업 #위지윅스튜디오 #두올 #대주산업 #에쓰씨엔지니어링 #켐트로스 #국일제지 #코오롱우 #한 국팩키지 #ybm넷 #신성델타테크 #sci평가정보 #진도 #화신정공 #삼성전자우 #한미반도체 #하나금융지주 #아진산업 #오리엔탈정공 #한네트 #한솔홈데코 #제이엠티 #지니뮤직 #db금융투자 #오디텍\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#진양화학 #유니온머티리얼 #소프트센 #이랜시스 #오스템 #두산중공업 #kb금융 #kg동부제철 #제일테크노스 #벽산 #카카오게임즈 #kec #루트로닉 #삼성엔지니어링 #정다운 #바이넥스 #엔에스엔 #sk증권우 #한세예스24홀딩스 #엔투텍 #현대그린푸 드 #인스코비 #한화솔루션 #한화시스템 #한국특수형강 #특수건설 #빅텍 #kbi메탈 #큐브앤컴퍼니 #상상인인더스트리 #뉴파워프라즈마 #프레스티지바이오로직스 #한양증권 #일신바이오\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#한국컴퓨터 #엘이티 #포스코인터내셔널 #현대바이오 #세운메디칼 #빅히트 #현대로템 #현대제철 #대양금속 #에이프로젠제약 #캐리소프트 #한온시스템 #씨젠 #피델릭스 #아이즈비전 #우리들휴브레인 #세원셀론텍 #유유제약 #아남전자 #kth #삼성 제약 #하림 #윈팩 #삼익악기 #대상홀딩스 #sbi핀테크솔루션즈 #바른손 #셀리드 #에이치엘비생명과학 #대유에이텍 #한국금융지주 #현대차증권 #세진중공업 #신원종합개발 #sm c&c #삼화페인트 #아가방컴퍼니 #서플러스글로벌 #삼일기업공사 #하나마이크론 #yg plus\n" +
            "\n" +
            "​\n" +
            "\n" +
            "​\n" +
            "\n" +
            "#글로본 #넵튠 #파인테크닉스 #동양 #차바이오텍 #동원금속 #우리조명 #아이에이네트웍스 #신원 #sk이노베이션 #가온미디어 #에스에이엠티 #도이치모터스 #kt #조이맥스 #씨엠에스에듀 #에스트래픽 #네오오토 #싸이버원 #서울리거 #현대차 #에이치엘비 #인지디스플레 #토탈소프트 #디알텍 #파트론 # 유바이오로직스 #코스모화학 #제로투세븐 #포스코 ict #진매트릭스 #한국맥널티 #에스엠 #jyp ent. #캠시스 #한솔홀딩스 #엘비세미콘 #피에스엠씨 #에스씨디 #엔에스쇼핑 #모나미 #오리온홀딩스 #프 레시티지바이오파마 #엔케이 #승일 #세미콘라이트 #국보 #코프라 #솔루엠 #동방선기 #웹젠 #켐온 #인포뱅크 #태경산업 #한국비엔씨 #고려산업 #삼기 #hdc현대산업개발 #dms #더블유에스아이 #디아이티 #대한제강 #로보스타 #서부t&d #제룡전기 #라닉스 #gst #토비스 #태경비케이 #한국프랜지 #덱스터 #참엔지니어링 #\n" +
            "\n" +
            "​\n" +
            "\n" +
            "==================\n" +
            "\n" +
            "​",
            comments: [
                "",
                "진입하기 은근힘들것는데 길에 테트라네",
                "모래사장이 푹푹 들어가는게 은근 힘이 많이듭니다 ㅋ 가까워 보이는데 직접 걸으면 왜이리 길어보이는지 ㅎㅎ",
                "고생하셨구요 축하드립니다 ^^ 전오늘 안목서",
                "형님 조행기 봤습니다~~ 추카드립니다 ^^",
                "정보감사합니다",
                "수고했어~^^추카추카",
                "수고혔어 조행기 잘쓰네",
                "형님들은 모두 타작하시는데 구력딸려서 8마리 갖고온게 부끄러워 올리지말까 하다가 ㅜㅜ ㅋㅋㅋ",
                "고생하셨습니다~",
                "수고",
                "고생했으^^",
                "가는길이 꽤 고달퍼 보이네요~~~수고 하셨습니다~~~"
            ]
        }
    },
    {
        source: "naverCafe",
        herf: "https://cafe.naver.com/no1cheonan/2835496?art=aW50ZXJuYWwtY2FmZS13ZWItc2VjdGlvbi1zZWFyY2gtbGlzdA.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiYXJ0aWNsZUlkIjoyODM1NDk2LCJjYWZlVXJsIjoibm8xY2hlb25hbiIsImlzc3VlZEF0IjoxNjIyNjgyNDE2MjE0fQ.LiGhFXW0h5O9ArwkPX5ltLhbHmtUYg28qlaS1y-uFms",
        postData: {
            title: "주년 축하해요 ",
            articleUploadDate: "2021-05-28",
            articleAuthor: "겨울아이87",
            mainText: "케이크축하로 시작된 8주년 정모^^\n" +
            "\n" +
            "​\n" +
            "\n" +
            "이번정모는 신나는 노래 맘껏듣고\n" +
            "\n" +
            "힐링타임~~\n" +
            "\n" +
            "​\n" +
            "\n" +
            "그리고 추억이 되어버린 모아클ㄹㅐ스로 시작해서\n" +
            "\n" +
            "아이가 벌써 6살이 되었는데\n" +
            "\n" +
            "오랜시간 줌마렐라와 함께했네요\n"  +
            "\n" +
            "​\n" +
            "\n" +
            "마지막 매님의 선곡까지\n" +
            "\n" +
            "가사가 정말 찡하고 \n" +
            "\n" +
            "​\n" +
            "\n" +
            "10주년 공약이 실현되는날까지\n" +
            "\n" +
            "코로나가 사라지고 모두가\n" +
            "\n" +
            "건강하고 행복했으면 좋겠네요^^\n" +
            "\n" +
            "​",
            comments: []
        }
    }
];



dbTest.put(data);