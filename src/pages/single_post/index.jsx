import { useParams } from "react-router-dom";
import BasicLayoutMobile from "../../layouts/mobile/basic_layout";
import { FindPostbySlugFn } from "../../queries/post";
import { useQuery } from "react-query";
import PostBreadcrumbs from "./post_breadcrumbs";
import { formatteCurrency } from "../../utils/formatNumber";
import { fromNow } from "../../utils/dateFormat";
import { Alert, Button } from "@mui/material";
import Images from "./images";
import { LoadingScreenFixed } from "../../shared/loader";

const SinglePost = () => {
  const { slug } = useParams();
  const { isLoading, data } = useQuery(
    "singlepost",
    FindPostbySlugFn.bind(this, slug)
  );
  return (
    <BasicLayoutMobile>
      {!isLoading && data?.data && data?.data?.title ? (
        <div className="w-full flex-col flex justify-between gap-6 px-44">
          <PostBreadcrumbs
            bread_crumb={data?.bread_crumb}
            title={data?.data?.title}
          />
          <div className="w-full flex justify-between gap-36">
            <div className="flex flex-col gap-4 w-1/2">
              <h5 className="text-xl text-gray-900 leading-10">
                {data?.data?.title}
              </h5>
              <div className="Fanum text-sm lg:text-md w-2/3 text-right text-gray-600 ">
                {data?.data?.amount && data?.data?.amount > 0
                  ? formatteCurrency(data?.data?.amount)
                  : "Best Offer"}
              </div>
              <span className="text-gray-400 text-xs Fanum mb-3">
                {fromNow(data?.data?.updatedAt)} in {data?.data?.district}
              </span>
              {data?.data?.isDelete ? (
                <Alert icon={<></>} severity="error">
                  آگهی حذف شده است
                </Alert>
              ) : (
                <div className="w-full flex justify-between">
                  <div className="flex flex-row gap-3 ">
                    <Button
                      size="medium"
                      variant="contained"
                      //   disabled={showPhone}
                      //   onClick={setShowPhone.bind(this, true)}
                    >
                      Contact Info
                    </Button>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    {/* <PostBookmark postId={data?.data?._id} />
                    <RWebShare
                      data={{
                        url: `${window.location.pathname}`,
                        title: `${data?.data?.title}`,
                      }}
                    >
                      <Tooltip title={`اشتراک گذاری`} arrow>
                        <IconButton>
                          <Share2Icon size={16} />
                        </IconButton>
                      </Tooltip>
                    </RWebShare> */}
                  </div>
                </div>
              )}
              <hr className="w-full" />
              {/* <PostOptions
                options={data?.data?.options}
                amount={data?.data?.amount}
              />
              <PostDescription desription={data?.data?.content} /> */}
            </div>
            <div className="flex flex-col gap-6 w-1/2">
              {data?.data?.images[0] && <Images images={data?.data?.images} />}
              {/* <SaveNote id={data?.data?._id} /> */}
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreenFixed />
      )}
      {/* <Dialog
        open={showPhone}
        onClose={setShowPhone.bind(this, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          className="border-b items-center justify-between"
          sx={{
            m: 0,
            p: 2,
            width: "100%",
            display: "flex",
          }}
        >
          <span className="text-lg">شماره تماس</span>
          <IconButton onClick={setShowPhone.bind(this, false)}>
            <X size={16} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{ justifyContent: "center", gap: "0.5rem", padding: "1rem" }}
        >
          <div className="flex flex-col gap-2 pt-4 w-[380px]">
            <div className="bg-teal-100 text-teal-700 rounded-lg p-3">
              <h6 className="text-sm">هشدار</h6>
              <p className="text-xs leading-6">
                برای جلوگیری از هر گونه کلاهبرداری، قبل از انجام معامله و پرداخت
                وجه از صحت کالا یا خدمات ارائه شده به صورت حضوری اطمینان حاصل
                کنید.
              </p>
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`call:${data?.data?.user?.mobile}`}
              className="w-full flex text-sm justify-start gap-2 items-center  py-3"
            >
              <Phone className="!stroke-[1px]" size={16} /> تماس با{" "}
              <span className="Fanum">{data?.data?.user?.mobile}</span>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`call:${data?.data?.user?.mobile}`}
              className="w-full flex text-sm justify-start gap-2 items-center  py-3"
            >
              <Mail className="!stroke-[1px]" size={16} /> پیامک با{" "}
              <span className="Fanum">{data?.data?.user?.mobile}</span>
            </a>
          </div>
        </DialogContent>
      </Dialog> */}
    </BasicLayoutMobile>
  );
};

export default SinglePost;
