<?php

class Share
{
    // Request
    public $Title;
    public $Description;
    public $Pic;
    public $From;

    // og meta
    public $width;
    public $height;
    public $title;
    public $description;
    public $image;

    public $site_root;
    public $url;

    function __construct() {
        $this->Title = filter_input(INPUT_GET, 'Title');
        $this->Description = filter_input(INPUT_GET, 'Description');
        $this->From = filter_input(INPUT_GET, 'From');
        $this->Pic = filter_input(INPUT_GET, 'Pic', FILTER_VALIDATE_INT);
        $this->site_root = 'https://www.our-work.com.tw/demosite/2020/2020-pxmoonfestival/';
    }

    public function main()
    {
        $this->url = "https://www.our-work.com.tw/demosite/2020/2020-pxmoonfestival/";
        $this->setFBmeta();

        include 'SharePage.php';
    }

    public function setFBmeta()
    {
        $this->width = 1200;
        $this->height = 630;

        $this->title = $this->Title;
        $this->description = $this->Description;
        if($this->From == 1) {
            $this->image = $this->site_root.'images/1/gameShare/game_0'.$this->Pic.'.jpg?t='.time();
        }
    }
}

$api = new Share();
$api->main();
