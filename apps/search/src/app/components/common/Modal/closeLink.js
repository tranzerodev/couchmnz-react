// app/components/common/closeLink
import React from 'react'

export default (props) => {
    return (
        <a href="#" className={props.linkClass}>
      	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-766 -5236 25 25">
    		  <g className="icon-close-orange" transform="translate(-2475 -6489)">
    		    <g data-name="Ellipse 39" className="icon-close-orange-1" transform="translate(1709 1253)">
    		      <circle className="icon-close-orange-3" cx="12.5" cy="12.5" r="12.5"></circle>
    		      <circle className="icon-close-orange-4" cx="12.5" cy="12.5" r="12"></circle>
    		    </g>
    		    <g data-name="Group 2729" transform="translate(-92 31)">
    		      <line data-name="Line 230" className="icon-close-orange-2" x2="11" y2="11" transform="translate(1808 1229)"></line>
    		      <line data-name="Line 231" className="icon-close-orange-2" x1="11" y2="11" transform="translate(1808 1229)"></line>
    		    </g>
    		   </g>
    		</svg>
        </a>        
    )
}