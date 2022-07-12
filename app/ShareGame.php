<?php

class Share
{
    // Request
    public $Title1;
    public $Description1;
    public $Pic;
    // public $From;

    // og meta
    public $width;
    public $height;
    public $title;
    public $description;
    public $image;

    public $site_root;
    public $url;

    public $shareTxt;

    function __construct() {
        // $this->Title1 = filter_input(INPUT_GET, 'Title', FILTER_VALIDATE_INT);
        // $this->Description1 = filter_input(INPUT_GET, 'Description');
        // $this->From = filter_input(INPUT_GET, 'From');
        $this->Pic = filter_input(INPUT_GET, 'pic', FILTER_VALIDATE_INT);
        $this->site_root = 'https://www.our-work.com.tw/demosite/2020/2020-pxmart/';
    }

    public function main()
    {
        $this->url = "https://www.our-work.com.tw/demosite/2020/2020-pxmart/";
        $this->setFBmeta();

        include 'SharePage.php';
    }

    public function setFBmeta()
    {
        $this->width = 1200;
        $this->height = 630;
        $this->shareTxt = array(
            array("失意烤者（等級0）", "或許你沒有天份，但後天的努力可以改變命運。請去重讀烤焦圖鑑。"),
            array("菜鳥烤者（等級1）", "分數如果低到讓你產生恐懼，那就將恐懼化作動力。請去重讀烤焦圖鑑。"),
            array("普級烤者（等級2）", "「烤得很普通」那種可有可無的感覺，對烤者更是沈重打擊。對於細節的掌握，是你現階段的功課。"),
            array("中級烤者（等級3）", "你已是一名成熟的烤者，別安於現狀，企圖心是你邁向更高級烤者的鑰匙。"),
            array("高級烤者（等級4）", "紙上談兵，已容納不下你的好奇心。能掌握60%食材知識的你來說，實際去烤，回到初心，就是你的原動力。"),
            array("達人級烤者（等級5）", "高於一般人類的烤技，一回頭，發現大家都在你後面。你能輕易地在中秋大會烤上，鶴立雞群，令人驚艷。"),
            array("神級烤者（等級666）", "您用烤物，讓人好吃到升天。鷹眼、神之手、火的掌控者、奇異博士，這些都只是您海量的稱號之一。"),
            array("傳說級烤者（等級GOD）", "除了仰望，無話可說。"),
        );

        $this->title = $this->shareTxt[$this->Pic][0];
        $this->description = $this->shareTxt[$this->Pic][1];
        $this->image = $this->site_root.'images/1/gameShare/game_0'.$this->Pic.'.jpg?t='.time();

    }
}

$api = new Share();
$api->main();
