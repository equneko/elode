<?php

namespace Bogardo;

use \cebe\markdown\GithubMarkdown;

class Markdown extends GithubMarkdown
{
	/**
	 * Default Codepen theme ID
	 */
	protected $theme;

	public function __construct($theme = false)
	{

		/**
		 * Set the default theme ID
		 */
		$this->theme = $theme;

	}

	/**
	* Codepen identifier
	*/
	protected function identifyLine($lines, $current)
	{
		if (strncmp($lines[$current], 'codepen[', 8) === 0) {
			return 'Codepen';
		}

		return parent::identifyLine($lines, $current);
	}

	/**
	 * Codepen Consumer
	 * 
	 * @param  array $lines 	All lines in document
	 * @param  int $current 	Current line
	 * @return array 			An array of a block and linenumber to continue consuming
	 */
	protected function consumeCodepen($lines, $current)
	{
		$block = [
			'type' 		=> 'Codepen',
			'content' 	=> [],
			'pen' 		=> false,
			'height' 	=> false,
			'tab' 		=> false,
			'theme' 	=> false
		];

		$line 	 = rtrim($lines[$current]);
		$matches = false;

		/**
		 * Regular expression that matches:
		 *  - A string starting with "codepen"
		 *  The pen identifier    - A string of alpha characters minimum of 4 characters and maximum of 8, between brackets.
		 *  The height of the pen - An integer with a minimum length of 2 and maximum of 5, between brackets.
		 *  The active tab        - (optional) A string equal to one of four options; 'html', 'css', 'js' or 'result', between brackets.
		 *  The theme for the pen - (optional) An integer with a minimum length of 1 and a maximum of 6, between brackets.
		 */
		$regex = "/^codepen(?:\[([A-z]{4,8})\])(?:\[(\d{2,5})\])(?:\[(html|css|js|result)\])?(?:\[(\d{1,6})\])?$/";
		preg_match($regex, $line, $matches);
		  	
		if (count($matches) < 3) return [$block, $current++];

		$block['pen'] = $matches[1];
		$block['height'] = $matches[2];

		if (isset($matches[3])) {
			$block['tab']	= $matches[3];
		}
		if (isset($matches[4])) {
			$block['theme']	= $matches[4];
		}
		
		return [$block, $current++];
	}

	/**
	 * Codepen Renderer
	 * 
	 * @param  array $block
	 * @return string 			HTML that should be rendered
	 */
	protected function renderCodepen($block)
	{
		if (!isset($block['pen'])) return false;

		$pen 	= $block['pen'];
		$height = $block['height'];
		$tab 	= 'result';
		$theme 	= $this->theme;

		if ($block['tab']) {
			$tab = $block['tab'];
		}

		if ($block['theme']) {
			$theme 	= $block['theme'];
		}

		return "<p data-height='{$height}' data-slug-hash='{$pen}' data-default-tab='{$tab}' data-theme-id='{$theme}' class='codepen'></p>";
	}	
}