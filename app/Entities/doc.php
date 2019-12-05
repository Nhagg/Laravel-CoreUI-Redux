<?php

class doc {

    /*
     * Supported mine-types
     */
    public const MINE_TYPE_TEXT_PLAIN       = "text/plain";
    public const MINE_TYPE_TEXT_HTML        = "text/html";
    public const MINE_TYPE_TEXT_MARKDOWN    = "text/markdown";


    /**
     * mine type (text/plain, text/markdown, text/html)
     * @var string Mine-Type
     */
    public $mine_type;
    
    /**
     * Content of document
     * @var string Content
     */
    public $content;
} 