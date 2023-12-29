import { Component, OnInit } from "@angular/core";
import jspdf from "jspdf";
import { HttpClient } from "@angular/common/http";
import { StartupService } from "../../services/startup.service";
import { ActivatedRoute } from "@angular/router";
import html2canvas from "html2canvas";
import {environment} from "../../../environments/environment";
import { CommonService } from "../../services/common.service";
import { Location } from '@angular/common';
// import axiosInstance from "axios";


@Component({
  selector: "ngx-pdf-template",
  templateUrl: "./pdf-template.component.html",
  styleUrls: ["./pdf-template.component.scss"],
})
export class PdfTemplateComponent implements OnInit {
  id: string;
  data: any;
  funding: any;
  contactInfo: any;
  teamInfo: any;
  team: any;
  market: any;
  OpportunityDetail:any;
  intellectual_detail:any;
  documentList:any;
  facebook_link: any;
  instagram_link: any;
  koo_link:any;
  linkedin_link:any;
  youtube_link:any;
  twitter_link:any;
  profile_image:any;
  profileLogoImg='./assets/images/user_icon.png';
  social= [
  {
  link:'https://www.instagram.com/meitystartup_hub/?hl=en',
  lname:'Facebook',
},
  {
  link:'https://www.instagram.com/meitystartup_hub/?hl=en',
  lname:'Instagram'},
  
  ]
  document= [
    {
    link:'jpeg-home.jpg',
    lname:'Facebook',
  },
    {
    link:'https://www.instagram.com/meitystartup_hub/?hl=en',
    lname:'Instagram'},
  ]
  baseUrl = environment.apiurl 

  constructor(
    private http: HttpClient,
    private startupService: StartupService,
    private _route: ActivatedRoute,
    private commonservice:CommonService,
    private location: Location
    
  ) {
    this.id = this._route.snapshot.paramMap.get("id");
    console.log(this.id);
  }

  ngOnInit(): void {
    this.generatePDF();
    // this.getDocuments();
  }

// go back function
goBack(): void {
  this.location.back();
  localStorage.setItem('viewback','true')
}
// go back function

  generatePDF() {
    this.startupService.getStartUpByID(this.id).subscribe((data: any) => {
      // let data= res.results[0];
      this.data = data.results[0];
      console.log("data", this.data);
      this.profile_image=this.data?.profile_image?this.data?.profile_image[0]?.url:this.profileLogoImg;
      // this.profile_image=data1.profile_image?data1.profile_image[0]?.url:this.profileLogoImg;  
      this.funding= this.data?.funding_info?.funding_info;
      console.log("funding", this.funding);
      this.contactInfo=this.data?.contact_info;
      this.team=this.data?.team_info?.teamInfo;
      console.log("team", this.team);
      this.market=this.data?.go_to_market_info?.go_to_market_info;
      this.OpportunityDetail=this.data?.opportunity_info?.opportunity_info;
      this.intellectual_detail=this.data?.intellectual_property_info?.intellectual_property_info;
      
      this.documentList=data.results[0].documents;
      console.log("=======",this.documentList);
      
      this.facebook_link=data.results[0].social_info.facebook
      // console.log(this.social, "--------------------------------");
      
       this.instagram_link=data.results[0].social_info.instagram
      this.koo_link=data.results[0].social_info.koo
      this.youtube_link=data.results[0].social_info.youtube
      this.twitter_link=data.results[0].social_info.twitter
      this.linkedin_link=data.results[0].social_info.linkedIn
    });
  }
  downloadPdf() {
    var data1 = document.getElementById("pdfSample") as HTMLElement;
    html2canvas(data1, {allowTaint: false,  useCORS: true}).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      // var imgWidth = 101.6;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save(`reports_${new Date().getTime()}.pdf`); // Generated PDF
    });
  }

  view_website(url:any){
    this.commonservice.view_website(url)
  }

  // getDocuments(){
  //   const url = this.baseUrl +`incubators/self/startups/${this.id}`;
  //   this.http.get(url)
  //   .subscribe(response => {
  //     console.log('fejdfejfdkrenfjrf',response)
  //     const documentList = 
  //     // this.documentList=response.data.results[0].documents
  //     // // this.social=response.data.results[0].social_info.facebook
  //     // this.facebook_link=response.data.results[0].social_info.facebook
  //     // console.log(this.social, "--------------------------------");
      
  //     // this.instagram_link=response.data.results[0].social_info.instagram
  //     // this.koo_link=response.data.results[0].social_info.koo
  //     // this.youtube_link=response.data.results[0].social_info.youtube
  //     // this.twitter_link=response.data.results[0].social_info.twitter
  //     // this.linkedin_link=response.data.results[0].social_info.linkedIn
  //     console.log("=====",this.documentList)
  //   })
  // }
 

 
}


