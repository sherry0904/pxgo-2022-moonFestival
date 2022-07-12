<?php

class Share
{
    // Request
    public $Title1;
    public $Description1;
    public $Pic;
    public $From;
    public $ID;

    // og meta
    public $width;
    public $height;
    public $title;
    public $description;
    public $image;

    public $site_root;
    public $url;

    function __construct() {
        $this->ID = filter_input(INPUT_GET, 'id');
//        $this->Title1 = filter_input(INPUT_GET, 'Title');
//        $this->Description1 = filter_input(INPUT_GET, 'Description');
//        $this->From = filter_input(INPUT_GET, 'From');
        $this->Pic = filter_input(INPUT_GET, 'Pic', FILTER_VALIDATE_INT);
        $this->site_root = 'https://eventpxmart.com.tw/';
    }

    public function main()
    {
        $jsonData = file_get_contents("../json/data.json");
        $json = json_decode($jsonData);
        $item = $json[$this->ID - 1];
        $this->title = '正在學習烤焦' . $item->cnname . '圖鑑';

        $this->url = "https://eventpxmart.com.tw/";
        $this->setFBmeta();

        include 'SharePage.php';
    }

    public function setFBmeta()
    {
        $this->width = 1200;
        $this->height = 630;

//        $this->title = urldecode($this->Title1);
        $this->description = '';
//        if($this->From == 1) {
//            $this->image = $this->site_root.'images/1/gameShare/game_0'.$this->Pic.'.jpg?t='.time();
//        }else {
            $this->image = $this->site_root.'images/foodshare/'.$this->ID.'.jpg?t='.time();
//        }
    }
}

$api = new Share();
$api->main();
